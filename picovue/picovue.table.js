export const PvTable = {
  props: {
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
  },
  template: `<div :class="['pv-table overflow-auto',{bordered}]">
    <table :class="{striped}">
      <thead>
        <tr>
          <th v-for="c in cols" :key="c.name">
            <div class="col-wrap">
              <div v-if="filter">
                <input v-model="filterCols[c.name]" type="text" :placeholder="c.label" :list="'dl'+c.name" />
                <datalist v-if="filterOpts?.datalist && filterOpts.datalist[c.name]" :id="'dl'+c.name">
                  <option v-for="(o, ox) in filterOpts.datalist[c.name]" :key="'o'+ox">{{ o }}</option>
                </datalist>
              </div>
              <span v-else :class="{active:sorting.name == c.name}">{{ c.label }}</span>
              <div class="sorter">
                <div @click="sortCol(c.name, 1)" :class="['sort asc',{active:sorting.name == c.name && sorting.dir == 1}]">▲</div>
                <div @click="sortCol(c.name, -1)" :class="['sort desc',{active:sorting.name == c.name && sorting.dir == -1}]">▼</div>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, rx) in rows" :key="'r'+rx">
          <td v-for="c in cols" :key="c.name">
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
  </div>`,
  setup(props) {
    const filterCols = Vue.reactive({})
    const sorting = Vue.reactive({
      dir: null,
      col: null
    })

    const cols = Vue.computed(() => {
      return (props.fields.length ? props.fields : Object.keys(props.items[0] || {})).map(c => ({
        name: c.name || c,
        label: c.label || (c.name || c).split(/_|-|(?=[A-Z])/).map(w => w[0].toUpperCase() + w.substring(1)).join(' '),
        align: c.align || false
      }))
    })

    const rows = Vue.computed(() => {
      const filters = Object.keys(filterCols)
      const results = props.filter && filters.length > 0
        ? props.items.filter(i => filters.map(f => i[f]?.toString()?.toLowerCase().indexOf(filterCols[f].toLowerCase()) > -1).every(b => b == true))
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

    Vue.watch(() => filterCols, (n, _o) => {
      Object.keys(n).forEach(k => {
        if (filterCols[k] == '' || filterCols[k] == null) delete filterCols[k]
      })
    }, { deep: true })

    return {
      cols,
      rows,
      filterCols,
      sorting,
      sortCol,
      toAttributeName
    }
  }
}

export default {
  install(app) {
    app.component('pv-table', PvTable)
  }
}

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
.pv-table {
  margin-bottom: 1rem;
}
.pv-table table {
  margin-bottom: 0;
}
.pv-table table thead th :where(input,select) {
  margin-bottom: 0;
  --pico-line-height: .75;
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
  padding: 0 .5rem;
  line-height: 1rem;
  opacity: .5;
  cursor: pointer;
}
.pv-table thead th .sorter .sort.active {
  opacity: 1;
}
`)
document.adoptedStyleSheets.push(sheet)