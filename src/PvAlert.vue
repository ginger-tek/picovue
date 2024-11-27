<script setup>
const props = defineProps({
  type: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div :class="['pv-alert', type]">
    <slot></slot>
  </div>
</template>

<style scoped>
.pv-alert:not(:empty) {
  display: block;
  background: var(--pico-secondary-background);
  color: white;
  border-radius: var(--pico-border-radius);
  margin: .5rem 0;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
}

.pv-alert.success {
  background: #398712;
  color: white;
}

.pv-alert.danger {
  background: #D93526;
  color: white;
}

.pv-alert.warning {
  background: #FFBF00;
  color: black;
}

.pv-alert.info {
  background: #3C71F7;
  color: white;
}
</style>