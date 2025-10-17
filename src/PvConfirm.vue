<script>
import { ref, watch } from 'vue'

const resolution = ref(null)

export async function confirmAsync(message, title = null) {
  resolution.value = null
  const confirmEl = document.createElement('dialog')
  document.body.appendChild(confirmEl)
  confirmEl.addEventListener('close', () => resolution.value ??= false)
  confirmEl.addEventListener('cancel', () => resolution.value ??= false)
  confirmEl.classList.add('pv-confirm')
  confirmEl.innerHTML = ['<article>', `<header><b>${title || 'Confirm'}</b></header>`,
    `<div>${message}</div>`,
    '<footer>',
    '<button type="button" class="secondary" id="confirm-no">No</button>',
    '<button type="button" id="confirm-yes">Yes</button>',
    '</footer>',
    '</article>'].join('')
  confirmEl.querySelector('#confirm-no')?.addEventListener('click', () => resolution.value = false)
  confirmEl.querySelector('#confirm-yes')?.addEventListener('click', () => resolution.value = true)
  confirmEl.showModal()
  return new Promise(res => {
    watch(() => resolution.value, (n) => {
      if (n !== null) {
        res(n)
        if (confirmEl && confirmEl.isConnected) {
          confirmEl.close()
          setTimeout(() => document.body.removeChild(confirmEl), 201)
        }
      }
    })
  })
}
</script>

<style>
@import './pv-common.css';
</style>