<script setup>
import { ref, watch, onBeforeMount } from 'vue'

const props = defineProps({
  persist: {
    type: Boolean,
    default: false
  }
})
const theme = ref(null)
const doc = document.documentElement

watch(() => theme.value, (n) => {
  if (getTheme() != n)
    doc.setAttribute('data-theme', n)
  else
    doc.removeAttribute('data-theme', n)
  if (props.persist && getTheme() != n)
    localStorage.setItem('theme', n)
  else
    localStorage.removeItem('theme')

})

function getTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

onBeforeMount(() => {
  if (localStorage.getItem('theme'))
    theme.value = localStorage.getItem('theme')
  else
    theme.value = getTheme()
})
</script>

<template>
  <label class="pv-dark-mode">
    <input type="checkbox" hidden v-model="theme" :true-value="'dark'" :false-value="'light'">
    <span :class="[theme]"></span>
  </label>
</template>

<style scoped>
.pv-dark-mode {
  padding: .5rem;
}

.pv-dark-mode span {
  display: inline-block;
  height: 1rem;
  width: 1rem;
  background-size: contain;
}

.pv-dark-mode :where(span:not(.dark), span.light) {
  /* Sun */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M7.707.003a.5.5 0 00-.375.846 6 6 0 01-5.569 10.024.5.5 0 00-.519.765A7.5 7.5 0 107.707.003z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
}

.pv-dark-mode :where(span:not(.light), span.dark) {
  /* Moon */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M8 2V0H7v2h1zm-4.793.498L1.5.792.793 1.5 2.5 3.206l.707-.708zm9.293.708L14.207 1.5 13.5.792l-1.707 1.706.707.708zm-5 .791a3.499 3.499 0 100 6.996 3.499 3.499 0 100-6.996zM2 6.995H0v1h2v-1zm13 0h-2v1h2v-1zM1.5 14.199l1.707-1.707-.707-.707-1.707 1.706.707.708zm12.707-.708L12.5 11.785l-.707.707L13.5 14.2l.707-.708zM8 14.99v-1.998H7v1.999h1z' fill='white'%3E%3C/path%3E%3C/svg%3E");
}
</style>