window.Vue ??= require('vue/dist/vue.esm-bundler.js')

export const PvModal = {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal'
    },
    hideClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'opened', 'closed'],
  template: `<dialog class="pv-modal" ref="modal">
    <article>
      <header>
        <button v-if="!hideClose" aria-label="Close" @click="closeModal" rel="prev"></button>
        <h5 v-html="title"></h5>
      </header>
      <slot></slot>
    </article>
  </dialog>`,
  setup(props, { emit }) {
    const modal = Vue.ref(null)
    const doc = document.documentElement

    function closeModal() {
      modal.value?.close()
      doc.classList.remove('modal-is-open')
      emit('update:modelValue', false)
      Vue.nextTick(() => emit('closed'))
    }

    function openModal() {
      modal.value?.showModal()
      modal.value?.focus()
      doc.classList.add('modal-is-open')
      emit('update:modelValue', true)
      Vue.nextTick(() => emit('opened'))
    }

    Vue.watch(() => props.modelValue, (n, _o) => {
      if (n) openModal()
      else closeModal()
    })

    Vue.onMounted(() => {
      modal.value.addEventListener('close', closeModal)
    })

    return {
      modal,
      closeModal
    }
  }
}

export default {
  install(app) {
    app.component('PvModal', PvModal)
  }
}

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
dialog {
  --pv-modal-distance: -2em;
  --pv-modal-duration: .2s;
  animation: fade-out-dialog var(--pv-modal-duration) ease-out;
}
dialog > article {
  animation: fade-out-article var(--pv-modal-duration) ease-out;
}
dialog[open] {
  animation: fade-in-dialog var(--pv-modal-duration) ease-out;
}
dialog[open] > article {
  animation: fade-in-article var(--pv-modal-duration) ease-out;
}
dialog[open]::backdrop {
  animation: backdrop-fade-in var(--pv-modal-duration) ease-in forwards;
}
dialog article > header .close {
  cursor: pointer;
}
@keyframes fade-in-dialog {
  0% {
    opacity: 0;
    top: var(--pv-modal-distance);
    display: none;
  }
  100% {
    opacity: 1;
    top: 0;
    display: flex;
  }
}
@keyframes fade-in-article {
  0% {
    opacity: 0;
    top: var(--pv-modal-distance);
    display: none;
  }
  100% {
    opacity: 1;
    top: 0;
    display: block;
  }
}
@keyframes fade-out-dialog {
  0% {
    opacity: 1;
    top: 0;
    display: flex;
  }
  100% {
    opacity: 0;
    top: var(--pv-modal-distance);
    display: none;
  }
}
@keyframes fade-out-article {
  0% {
    opacity: 1;
    top: 0;
    display: block;
  }
  100% {
    opacity: 0;
    top: var(--pv-modal-distance);
    display: none;
  }
}
@keyframes backdrop-fade-in {
  0% {
    background-color: rgb(0 0 0 / 0);
  }
  100% {
    background-color: rgb(0 0 0 / 0.25);
  }
}
`)
document.adoptedStyleSheets.push(sheet)
