<div align="center">
  <h1>PicoVue</h1>
  <p>A simple, no-build web UI Library, made for <a href="https://picocss.com">Pico CSS v2</a> with <a href="https://vuejs.com">Vue.js v3</a></p>
</div>

# How to use
PicoVue is a drop-in component library of plain ES6 module Vue.js 3 files used for sprinkling in Pico-styled, Vue-driven interactivity to any web page.
This is meant to be used with the [ESM/IIFE build version of Vue.js 3](https://www.npmjs.com/package/vue#which-dist-file-to-use), which can be added via script tag:
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```
~~However, you can add PicoVue to an SFC transpiled Vue.js project by importing the ESM bundler from `vue` first to make it available to the library~~ This functionality does not actually work, apparently. Apparently, the `* as Vue` import is not implicitly inherited into the PicoVue import, therefore `Vue` doesn't exist within the modules. Will work on coming up with a solution for this soon:
```js
import { createApp } from 'vue'
// import * as Vue from 'vue/dist/vue.esm-bundler.js'
// import PicoVue from '@ginger-tek/picovue'
import App from './app.vue'

createApp(App)
  // .use(PicoVue)
  .mount('#app')
```

The library can be globally added to your Vue instance:
```html
<div id="app"></div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script type="module">
  import PicoVue from 'https://unpkg.com/@ginger-tek/picovue/picovue.js'

  Vue.createApp()
    .use(PicoVue)
    .mount('#app')
</script>
```

You can globally import only the components you need:
```html
<div id="app"></div>
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script type="module">
  import PvTable from 'https://unpkg.com/@ginger-tek/picovue/picovue.table.js'
  import PvTabs from 'https://unpkg.com/@ginger-tek/picovue/picovue.tabs.js'

  Vue.createApp()
    .use(PvTable)
    .use(PvTabs)
    .mount('#app')
</script>
```

You can even import individual components only where you need them:
```js
import { PvTable } from 'https://unpkg.com/@ginger-tek/picovue/picovue.table.js'

export default {
  components: { PvTable },
  template: ``,
  setup() {}
}
```

# Component Docs
- [PvTable `<pv-table>`](/docs/table.md)
- [PvModal `<pv-modal>`](/docs/modal.md)
- [PvDropdown `<pv-dropdown>`](/docs/dropdown.md)
- [PvToaster `<pv-toaster>`](/docs/toaster.md)
- [PvDarkMode `<pv-dark-mode>`](/docs/dark-mode.md)
- [PvTabs `<pv-tabs>` + PvTab `<pv-tab>`](/docs/tabs.md)
- [PvAlert `<pv-alert>`](/docs/alert.md)
