<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: null,
    validator(value) {
      return [
        null,
        'success',
        'info',
        'warning',
        'danger'
      ].includes(value)
    }
  }
})
</script>

<template>
  <div :class="['pv-alert', variant]" role="alert">
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
  background: var(--pv-green);
  color: white;
}

.pv-alert.danger {
  background: var(--pv-red);
  color: white;
}

.pv-alert.warning {
  background: var(--pv-amber);
  color: black;
}

.pv-alert.info {
  background: var(--pv-cyan);
  color: white;
}
</style>