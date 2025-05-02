<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: [Array, Function],
    default: []
  },
  debounce: {
    type: Number,
    default: 250
  },
  placeholder: {
    type: String,
    default: 'Type to search...'
  }
})

const model = defineModel({ default: null })
const inputVal = ref(null)
const loading = ref(false)
const listRef = ref(null)
const listItems = ref([])
let bounce

function onInput() {
  if (!inputVal.value) {
    model.value = null
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
          else throw new Error('Returned value is not an array')
        } else if (props.items && Array.isArray(props.items))
          listItems.value = props.items
        else throw new Error('Items must be either an array or a callback function')
      } catch (ex) {
        console.error(ex)
      } finally {
        loading.value = false
      }
    }, props.debounce || 250)
  }
}

function selectItem(i) {
  model.value = i.value
  nextTick(() => inputVal.value = i.label)
  listRef.value.removeAttribute('open')
}
</script>

<template>
  <div class="pv-input-list">
    <input type="search" v-model="inputVal" @input="onInput" :placeholder="props.placeholder">
    <details class="dropdown" ref="listRef">
      <summary></summary>
      <ul>
        <li v-if="loading" aria-busy="true"></li>
        <li v-else-if="!loading && !!inputVal && !listItems.length">No items found</li>
        <li v-for="(i, x) in listItems" :key="'i-' + x" @click="selectItem(i)">
          <a>{{ i.label }}</a>
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

    >ul {
      max-height: 275px;
      overflow: auto;
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