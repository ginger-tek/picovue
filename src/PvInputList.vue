<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: [Array, Function],
    default: []
  },
  options: {
    type: Object,
    default: {}
  }
})

const model = defineModel({ default: null })
const inputVal = ref(null)
const loading = ref(false)
const listRef = ref(null)
const listItems = ref([])
let bounce

function onType() {
  if (!inputVal.value) {
    listRef.value.removeAttribute("open")
    listItems.value = []
  }
  if (inputVal.value === model.value) return
  if (bounce) clearTimeout(bounce)
  if (inputVal.value) {
    bounce = setTimeout(async () => {
      loading.value = true
      listRef.value.setAttribute("open", "open")
      try {
        if (props.items && props.items.constructor && props.items.call && props.items.apply) {
          const res = await props.items(inputVal.value)
          if (res && Array.isArray(res)) listItems.value = res
          else throw new Error('Returned type is not an array')
        } else if (props.items && Array.isArray(props.items) && props.options?.itemsFilter)
          listItems.value = props.items.filter(props.options.itemsFilter)
      } catch (ex) {
        console.error(ex)
      } finally {
        loading.value = false
      }
    }, props.options?.debounce || 250)
  }
}

function selectItem(i) {
  model.value = props.options?.model ? props.options.model(i) : i
  nextTick(() => inputVal.value = props.options?.display ? props.options.display(i) : i)
  listRef.value.removeAttribute('open')
}
</script>

<template>
  <div class="pv-input-list">
    <input type="search" v-model="inputVal" @input="onType" :placeholder="props.options?.placeholder || 'Type to search...'">
    <details class="dropdown" ref="listRef">
      <summary></summary>
      <ul>
        <li v-if="loading" aria-busy="true"></li>
        <li v-else-if="!loading && !!inputVal && !listItems.length">No items found</li>
        <li v-for="i in listItems" :key="i?.value || i" @click="selectItem(i)">
          <a>{{ i?.name || i }}</a>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
.pv-input-list {
  display: grid;

  >:where(details, input[type=search]) {
    grid-row: 1;
    grid-column: 1;
  }

  >details {
    z-index: 1;

    >summary {
      visibility: hidden;
    }

  }

  >input[type=search] {
    --pico-border-radius: 0.25rem;
    padding-inline-start: unset;
    padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
    background-image: unset;
    background-position: unset;
    background-size: unset;
    z-index: 2;
  }
}
</style>