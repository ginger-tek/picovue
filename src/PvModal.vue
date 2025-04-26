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
const emit = defineEmits(['opened', 'closed'])
const doc = document.documentElement

function closeModal() {
  modal.value.close()
  doc.classList.remove('modal-is-open')
  emit('update:modelValue', false)
  setTimeout(() => emit('closed'), 200)
}

function openModal() {
  modal.value.showModal()
  modal.value.focus()
  doc.classList.add('modal-is-open')
  emit('update:modelValue', true)
  nextTick(() => emit('opened'))
}

watch(() => toggleModal.value, (n) => {
  if (n) openModal()
  else closeModal()
})

defineExpose({ closeModal, openModal })

onMounted(() => modal.value.addEventListener('close', closeModal))
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