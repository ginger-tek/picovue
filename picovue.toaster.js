export const PvToaster = {
  props: {
    id: {
      type: String,
      default: 'pv-toaster'
    },
    position: {
      type: String,
      default: 'top-center',
      validator(value) {
        return [
          'top-center',
          'top-left',
          'top-right',
          'bottom-center',
          'bottom-left',
          'bottom-right'
        ].includes(value)
      }
    }
  },
  template: `<div :id="id" :class="['pv-toaster', position]"></div>`,
}

const closeToast = (e) => {
  const el = e.target || e
  el?.classList.remove('show')
  setTimeout(() => el?.remove(), 201)
}

export const appendToast = ({ body, dismissAfter = 5, stay = false, type = null }, id = 'pv-toaster') => {
  const toast = document.createElement('div')
  toast.classList.add('toast')
  if (type) toast.classList.add(type)
  toast.innerHTML = `<div aria-label="Close" class="close"></div>
  <div>${body}</div>`
  toast.querySelector('.close')?.addEventListener('click', ev => closeToast(ev.currentTarget.parentElement))
  document.getElementById(id)?.appendChild(toast)
  setTimeout(() => toast.classList.add('show'), 1)
  if (!stay) setTimeout(() => closeToast(toast), dismissAfter * 1000)
}

export default {
  install(app) {
    app.component('pv-toaster', PvToaster)
    app.provide('pv_appendToast', appendToast)
  }
}

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
.pv-toaster {
  position: fixed;
  z-index: 10000;
  max-height: 50dvh;
  overflow-y: auto;
  overflow-x: hidden;
  --pv-toaster-width: 400px;
}
.pv-toaster:not(:empty) {
  padding: 1rem;
}
.pv-toaster.top-center {
  top: 0;
}
.pv-toaster.top-left {
  top: 0;
  left: 0;
}
.pv-toaster.top-right {
  top: 0;
  right: 0;
}
.pv-toaster.bottom-center {
  bottom: 0;
}
.pv-toaster.bottom-left {
  bottom: 0;
  left: 0;
}
.pv-toaster.bottom-right {
  bottom: 0;
  right: 0;
}
.pv-toaster .toast {
  display: block;
  padding: 0 var(--pico-form-element-spacing-horizontal);
  background: var(--pico-secondary-background);
  color: var(--pico-color);
  border-radius: var(--pico-border-radius);
  opacity: 0;
  transition: .2s;
  width: 100%;
  box-shadow: var(--pico-card-box-shadow);
}
.pv-toaster:where(.top-center,.top-left,.top-right) .toast {
  margin: -1rem 0;
}
.pv-toaster:where(.bottom-center,.bottom-left,.bottom-right) .toast {
  margin: -1rem 1rem 0 0;
}
.pv-toaster:where(.top-left,.top-right,.bottom-left,.bottom-right) {
  width: 100%;
  max-width: var(--pv-toaster-width);
}
.pv-toaster:where(.top-center,.bottom-center) {
  left: 0;
  right: 0;
  margin-inline: auto;
  max-inline-size: var(--pv-toaster-width);
}
.pv-toaster .toast.show {
  margin: .5rem 0;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  opacity: 1;
}
.pv-toaster .toast.success {
  background: var(--pico-form-element-valid-border-color);
  color: white;
}
.pv-toaster .toast.error {
  background: var(--pico-form-element-invalid-border-color);
  color: white;
}
.pv-toaster .toast.info {
  background: var(--pico-accordion-active-summary-color);
  color: white;
}
.pv-toaster .toast .close {
  float: right;
  display: block;
  width: 1rem;
  height: 1rem;
  margin-left: var(--pico-spacing);
  background-image: var(--pico-icon-close);
  background-position: center;
  background-size: auto 1rem;
  background-repeat: no-repeat;
  background-color: transparent;
  cursor: pointer;
}
`)
document.adoptedStyleSheets.push(sheet)
