<script setup>
import { reactive, watch, computed, ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  fields: {
    type: Array,
    default: []
  },
  filter: {
    type: Boolean,
    default: false
  },
  sort: {
    type: Boolean,
    default: false
  },
  filterOpts: {
    type: Object,
    default: {}
  },
  bordered: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: false
  },
  busy: {
    type: Boolean,
    default: false
  }
})

const rowRefs = ref([])
const rowText = ref([])
const filterCols = reactive({})
const sorting = reactive({
  dir: null,
  col: null
})

const cols = computed(() => {
  return (props.fields.length ? props.fields : Object.keys(props.items[0] || {})).map(c => ({
    name: c.name || c,
    label: c.label || (c.name || c).split(/_|-|(?=[A-Z])/).filter(Boolean).map(w => w[0].toUpperCase() + w.substring(1)).join(' '),
    align: c.align || false
  }))
})

const rows = computed(() => {
  const filters = Object.keys(filterCols)
  const results = props.filter && filters.length > 0
    ? props.items.filter((i, x) => filters.map(f => (rowText.value[x]?.[cols.value.findIndex(c => c.name == f)]?.toString() || '').toLowerCase().indexOf(filterCols[f].toLowerCase()) > -1).every(b => b === true))
    : props.items
  return results.toSorted((a, b) => {
    if (a[sorting.name] > b[sorting.name]) return 1 * sorting.dir
    else if (a[sorting.name] < b[sorting.name]) return -1 * sorting.dir
    else return 0
  })
})

function sortCol(n, dir) {
  if (sorting.name == n && sorting.dir == dir) {
    sorting.name = null
    sorting.dir = null
  } else {
    sorting.name = n
    sorting.dir = dir
  }
}

function toAttributeName(n) {
  return n.split(/_|-|(?=[A-Z])/).map(w => w.toLowerCase()).join('-')
}

onMounted(() => {
  watch(() => props.items, () => {
    nextTick(() => rowText.value = rowRefs.value?.map(r => r.innerText?.trim()?.split("\t")))
  }, { deep: true })
})

watch(() => filterCols, (n, _) => {
  Object.keys(n).forEach(k => {
    if (filterCols[k] == '' || filterCols[k] == null) delete filterCols[k]
  })
}, { deep: true })
</script>

<template>
  <div :class="['pv-table overflow-auto', { bordered }]">
    <table :class="{ striped }">
      <thead>
        <tr>
          <th v-for="c in cols" :key="c.name">
            <div class="col-wrap">
              <div v-if="filter" class="filter" :title="c.label">
                <input v-model="filterCols[c.name]" type="text" :placeholder="c.label" :list="'dl' + c.name" />
                <datalist v-if="filterOpts.datalist && filterOpts.datalist[c.name]" :id="'dl' + c.name">
                  <option v-for="(o, ox) in filterOpts.datalist[c.name]" :key="'o' + ox">{{ o }}</option>
                </datalist>
              </div>
              <span v-else :class="{ active: sorting.name == c.name }"
                :style="{ 'text-align': c.align || 'inherit' }">{{ c.label }}</span>
              <div v-if="sort" class="sorter">
                <div @click="sortCol(c.name, 1)"
                  :class="['sort asc', { active: sorting.name == c.name && sorting.dir == 1 }]">▲</div>
                <div @click="sortCol(c.name, -1)"
                  :class="['sort desc', { active: sorting.name == c.name && sorting.dir == -1 }]">▼</div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody v-show="busy">
        <tr>
          <td colspan="100%">
            <slot name="busy">
              <div aria-busy="true"></div>
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-show="!busy">
        <tr v-for="(r, rx) in rows" :key="'r' + rx" ref="rowRefs">
          <td v-for="c in cols" :key="c.name" :style="{ 'text-align': c.align || 'inherit' }">
            <slot :name="toAttributeName(c.name)" :="r">{{ r[c.name] }}</slot>
          </td>
        </tr>
        <tr v-if="Object.values(filterCols).length && rows.length === 0">
          <td colspan="100%" class="empty">
            <slot name="empty-filtered">No items by that filter</slot>
          </td>
        </tr>
        <tr v-else-if="rows.length === 0">
          <td colspan="100%" class="empty">
            <slot name="empty">No data</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pv-table {
  margin-bottom: 1rem;
}

.pv-table table {
  margin-bottom: 0;
}

.pv-table table thead th .col-wrap .filter :where(input, select) {
  margin-bottom: 0;
  --pico-line-height: .75;
}

.pv-table table thead th .col-wrap .filter {
  flex: 1;
}

.pv-table.bordered {
  border: 1px solid var(--pico-accordion-border-color);
  border-radius: var(--pico-border-radius);
}

.pv-table .empty {
  text-align: center;
}

.pv-table thead th {
  position: sticky;
  top: 0;
  min-width: 150px;
  padding-right: .25rem;
}

.pv-table thead th .col-wrap {
  display: flex;
  align-items: center;
}

.pv-table thead th .sorter .sort {
  padding: 0px 0.5rem;
  line-height: calc(.95* (var(--pico-font-size)));
  font-size: calc(.75* (var(--pico-font-size)));
  opacity: 0.5;
  cursor: pointer;
}

.pv-table thead th .sorter .sort.active {
  opacity: 1;
}

.pv-table tbody :where(button, [role=button], input:not([type=checkbox], [type=radio], [type=range], [type=file]), select) {
  height: auto;
  margin-right: inherit;
  margin-bottom: 0;
  margin-left: inherit;
  padding: calc(var(--pico-nav-link-spacing-vertical) - var(--pico-border-width)* 2) var(--pico-nav-link-spacing-horizontal);
}
</style>