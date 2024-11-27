<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: []
  }
})
const selected = defineModel()
const dropdown = ref(null)

function selectItem(i) {
  if (!i.href) selected.value = i.value || i
  dropdown.value.removeAttribute('open')
}
</script>

<template>
  <details ref="dropdown" class="pv-dropdown dropdown">
    <summary>
      <slot v-if="selected" name="selected">{{ selected }}</slot>
      <slot v-else>Select one</slot>
    </summary>
    <ul>
      <li v-for="(i, x) in items" :key="'di' + x">
        <a @click="selectItem(i)" :href="i.href || '#'">{{ i.text || i }}</a>
      </li>
    </ul>
  </details>
</template>

<style scoped>
.pv-dropdown ul li {
  cursor: pointer;
}
</style>