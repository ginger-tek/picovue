window.Vue ??= require('vue/dist/vue.esm-bundler.js')

export const PvDropdown = {
  props: {
    modelValue: {
      type: [String, Object],
      default: null
    },
    items: {
      type: Array,
      default: []
    }
  },
  emit: ['modelValue', 'update:modelValue'],
  template: `<details ref="dropdown" class="pv-dropdown dropdown">
    <summary><slot></slot></summary>
    <ul>
      <li v-for="(i, ix) in items" :key="'di'+ix"><a @click="selectItem(i)" :href="i.href">{{ i.text || i }}</a></li>
    </ul>
  </details>`,
  setup(_props, { emit }) {
    const dropdown = Vue.ref(null)

    function selectItem(i) {
      if (!i.href)
        emit('update:modelValue', i.value || i)
      dropdown.value.removeAttribute('open')
    }

    return {
      dropdown,
      selectItem
    }
  }
}

export default {
  install(app) {
    app.component('PvDropdown', PvDropdown)
  }
}

const sheet = new CSSStyleSheet()
sheet.replaceSync(`
.pv-dropdown ul li {
  cursor: pointer;
}
`)
document.adoptedStyleSheets.push(sheet)
