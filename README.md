<div align="center">
  <h1>PicoVue</h1>
  <p>A simple, no-build web UI Library, made for <a href="https://picocss.com">Pico CSS v2</a> with <a href="https://vuejs.com">Vue.js v3</a></p>
</div>

# How to use
PicoVue is a component library of used for sprinkling in Pico-styled, Vue-driven interactivity to any web page or project.

Each component file is a plain ES6 module that allows the same, simple code to be implemented in different types of Vue builds, such as with the esm-bundler build (Vite Project) or esm-browser build (Web browser).

## Vite Project (SFC)
To use PicoVue in a Vite project alongside Single File Components (SFC), `npm install @ginger-tek/picovue` and resolve the `vue` library to the ESM bundler instead by adding the following to your `vite.config.js`:
```js
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})
```

## Browser + CDN (ESM)
To use PicoVue directly in the browser without a build step, import the [ESM Browser version of Vue.js 3](https://www.npmjs.com/package/vue#which-dist-file-to-use) via an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) along with PicoVue:
```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@latest/dist/vue.esm-browser.js",
      "@ginger-tek/picovue/": "https://unpkg.com/@ginger-tek/picovue@latest/"
    }
  }
</script>
```
**Note the trailing slashes on the PicoVue import, which are used to [prefix](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap#mapping_path_prefixes) your individual component references**

# Examples
Once you have your setup configured, simply import the components you want to use:
```js
import { PvTable } from '@ginger-tek/picovue/picovue.table.js'
import { PvDarkMode } from '@ginger-tek/picovue/picovue.table.js'
```
```html
<pv-table :items="..." />
<pv-dark-mode />
```

# Component Docs
- [PvTable](/docs/table.md)
- [PvModal](/docs/modal.md)
- [PvDropdownown](/docs/dropdown.md)
- [PvToasterer](/docs/toaster.md)
- [PvDarkModemode](/docs/dark-mode.md)
- [PvTabs](/docs/tabs.md)
- [PvAlert](/docs/alert.md)
