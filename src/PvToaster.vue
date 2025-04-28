<script>
export const removeToast = (e) => {
  const el = e.target || e
  el.classList.remove('show')
  setTimeout(() => {
    const parent = el.parentElement
    if (parent && !parent.hasChildNodes()) parent.hidePopover()
    el.remove()
  }, 201)
}

export const appendToast = (body, opts = {}) => {
  opts.dismissAfter ??= 3
  opts.variant ??= null
  opts.stay ??= false
  opts.id ??= 'pv-toaster'
  const toaster = document.getElementById(opts.id)
  if (!toaster) throw new Error('Toaster not found')
  const toast = document.createElement('div')
  toast.classList.add('toast')
  if (opts.variant) toast.classList.add(opts.variant)
  toast.innerHTML = `<div aria-label="Close" class="close"></div><div>${body}</div>`
  toast.querySelector('.close')?.addEventListener('click', ev => removeToast(ev.currentTarget.parentElement))
  toaster.appendChild(toast)
  toaster.showPopover()
  setTimeout(() => toast.classList.add('show'), 1)
  if (!opts.stay) setTimeout(() => removeToast(toast), opts.dismissAfter * 1000)
}
</script>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
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
})

onMounted(() => {
  const toaster = document.getElementById(props.id)
  const ob = new MutationObserver(([doc]) => {
    if (doc.target.classList.contains('modal-is-open') && toaster.matches(':popover-open')) {
      toaster.hidePopover()
      toaster.showPopover()
    }
  })
  ob.observe(document.documentElement, { attributeFilter: ['class'] })
})
</script>

<template>
  <div :id="id" popover="manual" style="width:var(--pv-toaster-width)" popovertargetaction="show"
    :class="['pv-toaster', position]"></div>
</template>

<style>
.pv-toaster {
  max-height: 50dvh;
  overflow-y: auto;
  overflow-x: hidden;
  border: none;
  background: transparent;
  --pv-toaster-width: 425px;
}

[popover]::backdrop {
  display: none;
}

.pv-toaster:empty {
  padding: 0;
}

.pv-toaster:not(:empty) {
  padding: 1rem;
}

.pv-toaster.top-center {
  margin-inline: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.pv-toaster.top-left {
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.pv-toaster.top-right {
  margin-right: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.pv-toaster.bottom-center {
  margin-inline: auto;
  margin-bottom: 0;
}

.pv-toaster.bottom-left {
  margin-left: 0;
  margin-bottom: 0;
}

.pv-toaster.bottom-right {
  margin-right: 0;
  margin-bottom: 0;
}

.pv-toaster .toast {
  display: block;
  background: var(--pico-secondary-background);
  color: white;
  border-radius: var(--pico-border-radius);
  margin: .5rem 0;
  padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  opacity: 0;
  transition: .2s;
  width: 100%;
  box-shadow: var(--pico-card-box-shadow);
}

.pv-toaster:where(.top-center, .top-left, .top-right) .toast {
  margin: -1rem 0;
}

.pv-toaster:where(.bottom-center, .bottom-left, .bottom-right) .toast {
  margin: -1rem 1rem 0 0;
}

.pv-toaster:where(.top-left, .top-right, .bottom-left, .bottom-right) {
  width: 100%;
  max-width: var(--pv-toaster-width);
}

.pv-toaster:where(.top-center, .bottom-center) {
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

.pv-toaster .toast .close {
  float: right;
  margin: 0;
  margin-left: var(--pico-spacing);
  padding: 0;
  transition: opacity var(--pico-transition);
  opacity: .5;
  cursor: pointer;
}

.pv-toaster .toast .close:before {
  display: block;
  content: '\00D7';
  font-size: 1.45rem;
  line-height: 1rem;
  width: 1rem;
  height: 1rem;
}

.pv-toaster .toast .close:hover {
  opacity: .9;
}

.pv-toaster .toast.success {
  background: var(--pv-green);
  color: white;
}

.pv-toaster .toast.danger {
  background: var(--pv-red);
  color: white;
}

.pv-toaster .toast.warning {
  background: var(--pv-amber);
  color: black;
}

.pv-toaster .toast.info {
  background: var(--pv-cyan);
  color: white;
}
</style>