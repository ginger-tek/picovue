<script setup>
import { onUnmounted } from 'vue'

const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

onUnmounted(console.log('unmounted'))
</script>

<template>
  <div class="pv-tab">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>