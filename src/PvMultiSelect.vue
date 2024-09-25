<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: []
  }
})
const selected = ref([])
</script>

<template>
  <details class="pv-dropdown dropdown">
    <summary>
      <slot v-if="selected.length" name="selected">{{ selected }}</slot>
      <slot v-else>Select one or more</slot>
    </summary>
    <ul>
      <li v-for="(i, x) in items" :key="'di' + x">
        <label>
          <input type="checkbox" v-model="selected" @change="$emit('update:modelValue', selected)" :value="i.value || i">
          {{ i.text || i }}
        </label>
      </li>
    </ul>
  </details>
</template>

<style scoped>
.pv-dropdown ul li {
  cursor: pointer;
}
</style>