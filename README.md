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
However, you can add PicoVue to an SFC transpiled Vue.js project. In this case, the ESM bundler from `vue` package is imported when the ESM/IIFE global is not available:
```js
import { createApp } from 'vue'
import PicoVue from '@ginger-tek/picovue'
import App from './app.vue'

createApp(App)
  .use(PicoVue)
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
- [PvTable](/docs/table.md)
- [PvModal](/docs/modal.md)
- [PvDropdownown](/docs/dropdown.md)
- [PvToasterer](/docs/toaster.md)
- [PvDarkModemode](/docs/dark-mode.md)
- [PvTabs](/docs/tabs.md)
- [PvAlert](/docs/alert.md)
