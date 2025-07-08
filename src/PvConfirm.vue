<script setup>
import { onMounted, ref, watch } from 'vue'

const confirmEl = ref(null)
const resolution = ref(null)
const message = ref(null)

async function confirmAsync(msg = '') {
  resolution.value = null
  message.value = msg
  confirmEl.value.showModal()
  return new Promise(res => {
    watch(() => resolution.value, (n) => {
      if (n !== null) {
        res(n)
        confirmEl.value.close()
      }
    })
  })
}

onMounted(() => {
  confirmEl.value.addEventListener('close', () => resolution.value = false)
  confirmEl.value.addEventListener('cancel', () => resolution.value = false)
})

defineExpose({ confirmAsync })
</script>

<template>
  <dialog ref="confirmEl">
    <article>
      <header>
        <div><b>Confirm</b></div>
      </header>
      <slot>{{ message }}</slot>
      <footer>
        <button @click="resolution = false" class="secondary">No</button>
        <button @click="resolution = true">Yes</button>
      </footer>
    </article>
  </dialog>
</template>

<style>
@import './pv-common.css';
</style>