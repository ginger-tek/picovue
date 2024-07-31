export const PvAlert = {
    props: {
      type: {
        type: String,
        default: null
      }
    },
    template: `<div :class="['pv-alert', type]">
      <slot></slot>
    </div>`
  }

  export default {
    install(app) {
      app.component('pv-alert', PvAlert)
    }
  }
  
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(`
  .pv-alert:not(:empty) {
    display: block;
    padding: 0 var(--pico-form-element-spacing-horizontal);
    background: var(--pico-secondary-background);
    color: var(--pico-color);
    border-radius: var(--pico-border-radius);
    margin: .5rem 0;
    padding: var(--pico-form-element-spacing-vertical) var(--pico-form-element-spacing-horizontal);
  }
  .pv-alert.success {
    background: var(--pico-form-element-valid-border-color);
    color: white;
  }
  .pv-alert.error {
    background: var(--pico-form-element-invalid-border-color);
    color: white;
  }
  .pv-alert.info {
    background: var(--pico-accordion-active-summary-color);
    color: white;
  }
  `)
  document.adoptedStyleSheets.push(sheet)