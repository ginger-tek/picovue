<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  hideClose: {
    type: Boolean,
    default: false
  }
})
const toggleModal = defineModel()
const modal = ref(null)
const emit = defineEmits(['opening', 'opened', 'closing', 'closed'])
const doc = document.documentElement

function openModal() {
  modal.value.showModal()
  doc.classList.add('modal-is-open')
  emit('update:modelValue', true)
  emit('opening')
  setTimeout(() => emit('opened'), 200)
}

function closeModal() {
  modal.value.close()
}

function handleClose() {
  doc.classList.remove('modal-is-open')
  emit('update:modelValue', false)
  emit('closing')
  setTimeout(() => emit('closed'), 200)
}

watch(() => toggleModal.value, (n) => {
  if (n) openModal()
  else closeModal()
})

defineExpose({ closeModal, openModal })

onMounted(() => modal.value.addEventListener('close', handleClose))
</script>

<template>
  <dialog class="pv-modal" ref="modal">
    <article>
      <header>
        <button v-if="!hideClose" aria-label="Close" @click="closeModal" rel="prev"></button>
        <div>
          <slot name="header">Modal</slot>
        </div>
      </header>
      <slot></slot>
    </article>
  </dialog>
</template>