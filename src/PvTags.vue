<script setup>
import { ref, watch } from 'vue'

defineOptions({
  inheritAttrs: false
})

const model = defineModel()
const chars = ref('')
const tags = ref(new Set(model.value || []))

function handle(ev) {
  if (ev.key == 'Backspace' && chars.value.length == 0) {
    tags.value.delete(Array.from(tags.value).pop())
  } else if (ev.key == 'Enter' && chars.value.length > 0) {
    tags.value.add(chars.value)
    chars.value = ''
  }
}

watch(() => tags.value, () => model.value = Array.from(tags.value), { deep: true })
</script>

<template>
  <div class="pv-tags">
    <input class="facade" tabindex="-1">
    <div class="tag-pills">
      <div v-for="(tag, x) in tags" :key="tag" class="tag-pill">{{ tag }} <span class="close" aria-label="Remove"
          @click="tags.delete(tag)">&times;</span>
      </div>
      <input class="input" @keydown="handle" v-model="chars" tabindex="0" v-bind="$attrs">
    </div>
  </div>
</template>

<style scoped>
.pv-tags {
  position: relative;
  margin-bottom: var(--pico-spacing);
  --pico-outline-width: 0.0625rem;
  --pico-background-color: var(--pico-form-element-background-color);
  --pico-border-color: var(--pico-form-element-border-color);
  --pico-color: var(--pico-form-element-color);
  --pico-box-shadow: none;
  border: var(--pico-border-width) solid var(--pico-border-color);
  border-radius: var(--pico-border-radius);
  outline: 0;
  background-color: var(--pico-background-color);
  box-shadow: var(--pico-box-shadow);
  color: var(--pico-color);
  font-weight: var(--pico-font-weight);
  transition: background-color var(--pico-transition), border-color var(--pico-transition), color var(--pico-transition), box-shadow var(--pico-transition);
}

.pv-tags:has(input:not([type=submit], [type=button], [type=reset], [type=range], [type=file], [readonly]):focus) {
  --pico-background-color: var(--pico-form-element-active-background-color);
  --pico-border-color: var(--pico-form-element-active-border-color);
  --pico-box-shadow: 0 0 0 var(--pico-outline-width) var(--pico-form-element-focus-color);
}

.facade {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  bottom: 0;
  top: 0;
  height: auto;
  margin-bottom: 0;
}

.input {
  display: inline-block;
  flex: 1;
  border: none;
  background: none;
  box-shadow: none;
  outline: none;
  margin: calc(-.5* var(--pico-form-element-spacing-vertical)) calc(-.5* var(--pico-form-element-spacing-horizontal));
  padding: calc(.5* var(--pico-form-element-spacing-vertical)) calc(.5* var(--pico-form-element-spacing-horizontal));
  height: calc(1rem* var(--pico-line-height) + var(--pico-form-element-spacing-vertical)* 1 + var(--pico-border-width)* 2);
  z-index: 1;
}

.tag-pills {
  display: flex;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  gap: .5em;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tag-pill {
  display: inline-block;
  padding: 0 .5em;
  border-radius: var(--pico-border-radius);
  background: var(--pico-primary-background);
  color: var(--pico-color-inverse);
}

.tag-pill .close {
  cursor: pointer;
}
</style>