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
  --pv-modal-distance: 1em;
  --pv-modal-shrink: .95;
  --pv-modal-duration: .2s;
  animation: fadeout var(--pv-modal-duration) ease-out forwards;
}
dialog[open] {
  animation: fadein var(--pv-modal-duration) ease-in forwards;
}
dialog>article {
  animation: slidedown var(--pv-modal-duration) ease-out forwards;
}
dialog[open]>article {
  animation: slideup var(--pv-modal-duration) ease-in forwards;
}
dialog article > header .close {
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
`)
document.adoptedStyleSheets.push(sheet)
