<script setup>
import { ref, useSlots } from 'vue'

const props = defineProps({
  stretch: {
    type: Boolean,
    default: false
  },
  persist: {
    type: Boolean,
    default: false
  }
})

const slots = useSlots().default()
const active = ref(slots[0])
</script>

<template>
  <article class="pv-tabs">
    <header>
      <ul :class="{ stretch }">
        <li v-for="(s, i) in slots" :key="'t' + i" @click="active = s"
          :class="['tab-btn secondary', { active: active == s }]" role="button" :disabled="s.props.disabled">
          {{ s.props.title }}
        </li>
      </ul>
    </header>
    <KeepAlive :include="persist ? 'PvTab' : 'none'">
      <component :is="active" :key="active"></component>
    </KeepAlive>
  </article>
</template>

<style>
.pv-tabs header {
  padding-bottom: 0;
  border-bottom: var(--pico-border-width) solid var(--pico-accordion-border-color);
}

.pv-tabs header ul {
  display: flex;
  padding: 0;
  margin: 0;
  gap: .5rem;
  overflow: auto;
  margin-bottom: calc(-1* var(--pico-border-width));
}

.pv-tabs header ul.stretch .tab-btn {
  flex: 1;
}

.pv-tabs header ul li {
  display: block;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-color: var(--pico-accordion-border-color);
  color: var(--pico-contrast);
  padding: calc(var(--pico-spacing) / 1.5);
  min-width: 100px;
}

.pv-tabs header ul li:disabled {
  opacity: .5;
}

.pv-tabs header ul li.active {
  background: var(--pico-card-background-color);
  border-bottom-color: transparent;
}

:where([data-theme=light], :root:not([data-theme=dark])) .pv-tabs header ul li {
  background: var(--pico-card-border-color);
}

:where([data-theme=dark], :root:not([data-theme=light])) .pv-tabs header ul li {
  background: var(--pico-dropdown-hover-background-color);
}
</style>