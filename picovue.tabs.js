export const PvTab = {
  name: 'pv-tab-' + Date.now(),
  props: {
    title: {
      type: String,
      default: 'Tab'
    },
    persist: {
      type: Boolean,
      default: false
    }
  },
  template: `<div class="pv-tab">
    <slot></slot>
  </div>`
}

export const PvTabs = {
  props: {
    stretch: {
      type: Boolean,
      default: false
    }
  },
  template: `<article class="pv-tabs">
    <header>
      <ul :class="{stretch}">
        <li v-for="(s,i) in slots.default()" :key="'t'+i" @click="active = i" :class="['tab-btn secondary',{active:active == i}]" role="button" :disabled="s.props.disabled">
          {{ s.props.title }}
        </li>
      </ul>
    </header>
    <keep-alive :include="persisted">
      <component :is="slots.default()[active]" :key="slots.default()[active]"></component>
    </keep-alive>
  </article>`,
  setup() {
    const slots = Vue.useSlots()
    const active = Vue.ref(0)
    const persisted = Vue.ref([])

    Vue.onMounted(() => {
      persisted.value = slots.default().filter(s => s.props.hasOwnProperty('persist')).map(s => s.type.name)
    })

    return {
      active,
      persisted,
      slots
    }
  }
}

export default {
  install(app) {
    app.component('pv-tab', PvTab)
    app.component('pv-tabs', PvTabs)
  }
}

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
.pv-tabs header {
  padding-bottom: 0;
  border-bottom: var(--pico-border-width) solid var(--pico-accordion-border-color);
}
.pv-tabs header ul {
  display: flex;
  padding: 0;
  margin: 0;
  gap: .5rem;
  overflow: auto;
  margin-bottom: calc(-1* var(--pico-border-width));
}
.pv-tabs header ul.stretch .tab-btn {
  flex: 1;
}
.pv-tabs header ul li {
  display: block;
  margin: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: var(--pico-card-border-color);
  border-color: var(--pico-accordion-border-color);
  color: var(--pico-contrast);
  min-width: 100px;
}
.pv-tabs header ul li:disabled {
  opacity: .5;
}
.pv-tabs header ul li.active {
  background: var(--pico-card-background-color);
  border-bottom-color: transparent;
  font-weight: bold;
}
`)
document.adoptedStyleSheets.push(sheet)
