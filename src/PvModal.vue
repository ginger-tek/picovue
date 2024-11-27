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
  nextTick(() => emit('closed'))
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

onMounted(() => {
  modal.value.addEventListener('close', closeModal)
})
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

<style scoped>
dialog.pv-modal {
  --pv-modal-distance: 1em;
  --pv-modal-shrink: .95;
  --pv-modal-duration: .2s;
  animation: fadeout var(--pv-modal-duration) ease-out forwards;
}

dialog.pv-modal[open] {
  animation: fadein var(--pv-modal-duration) ease-in forwards;
}

dialog.pv-modal>article {
  animation: slidedown var(--pv-modal-duration) ease-out forwards;
}

dialog.pv-modal[open]>article {
  animation: slideup var(--pv-modal-duration) ease-in forwards;
}

dialog.pv-modal article>header .close {
  cursor: pointer;
}

@keyframes fadein {
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: 1;
    display: flex;
  }
}

@keyframes fadeout {
  0% {
    opacity: 1;
    display: flex;
  }

  100% {
    opacity: 0;
    display: none;
  }
}

@keyframes slideup {
  0% {
    margin-top: var(--pv-modal-distance);
    transform: scale(var(--pv-modal-shrink));
  }

  100% {
    margin-top: 0;
    transform: scale(1);
  }
}

@keyframes slidedown {
  0% {
    margin-top: 0;
    transform: scale(1);
  }

  100% {
    margin-top: var(--pv-modal-distance);
    transform: scale(var(--pv-modal-shrink));
  }
}
</style>