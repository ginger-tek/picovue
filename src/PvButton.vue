<script setup>
defineProps({
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
  },
  type: {
    type: String,
    default: 'button',
    validator(value) {
      return [
        'button',
        'reset',
        'submit'
      ].includes(value)
    }
  },
  busy: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="['pv-btn', variant]" :type="type" :aria-busy="busy" :disabled="busy">
    <slot></slot>
  </button>
</template>

<style scoped>
button.pv-btn.success {
  --pico-background-color: var(--pv-green);
  --pico-border-color: var(--pv-green);
  --pico-color: white;

  &:is(:hover, :focus, :active) {
    --pico-border-color: var(--pv-green-hover);
    --pico-background-color: var(--pv-green-hover);

    &:focus {
      --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pv-green-box-shadow);
    }
  }
}

button.pv-btn.danger {
  --pico-background-color: var(--pv-red);
  --pico-border-color: var(--pv-red);
  --pico-color: white;

  &:is(:hover, :focus, :active) {
    --pico-border-color: var(--pv-red-hover);
    --pico-background-color: var(--pv-red-hover);

    &:focus {
      --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pv-red-box-shadow);
    }
  }
}

button.pv-btn.warning {
  --pico-background-color: var(--pv-amber);
  --pico-border-color: var(--pv-amber);
  --pico-color: black;

  &:is(:hover, :focus, :active) {
    --pico-border-color: var(--pv-amber-hover);
    --pico-background-color: var(--pv-amber-hover);

    &:focus {
      --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pv-amber-box-shadow);
    }
  }
}

button.pv-btn.info {
  --pico-background-color: var(--pv-cyan);
  --pico-border-color: var(--pv-cyan);
  --pico-color: white;

  &:is(:hover, :focus, :active) {
    --pico-border-color: var(--pv-cyan-hover);
    --pico-background-color: var(--pv-cyan-hover);

    &:focus {
      --pico-box-shadow: var(--pico-button-hover-box-shadow, 0 0 0 rgba(0, 0, 0, 0)), 0 0 0 var(--pico-outline-width) var(--pv-cyan-box-shadow);
    }
  }
}
</style>