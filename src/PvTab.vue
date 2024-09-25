<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Tab'
  }
})
</script>

<template>
  <div class="pv-tab">
    <slot></slot>
  </div>
</template>