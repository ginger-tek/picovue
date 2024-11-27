<script setup>
defineOptions({
  options: {
    name: 'PvTab' + Date.now()
  }
})

const props = defineProps({
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="pv-tab">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>