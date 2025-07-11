<div align=center>
  <h1>PicoVue</h1>
  <p><b>A small collection of <a href="https://vuejs.org">Vue 3</a> UI components styled for the <a href="https://picocss.com">Pico CSS</a> framework</b></p>
</div>

## How to Use
You can use PicoVue in a compiled project via [npm](https://npmjs.com/@ginger-tek/picovue), such as with Vite, or in any HTML with the Vue [IIFE global build](https://www.npmjs.com/package/vue#from-cdn-or-without-a-bundler) via [CDN](https://unpkg.com/vue)

### NPM + Vite Build
```bash
npm install @ginger-tek/picovue
```
Import individual components as needed
```js
import { PvTable } from '@ginger-tek/picovue/PvTable.vue'
```
```html
<PvTable :items="..."></PvTable>
```

### CDN + IIFE Build
```html
<script src="https://unpkg.com/vue/dist/vue.global.js"></script>
<script src="https://unpkg.com/@ginger-tek/picovue/picovue.global.js"></script>
<script src="/main.js">
Vue.createApp({
  template: `<pv-table :items="items"></pv-table>`,
  setup() {
    const items = Vue.ref([])
    return { items }
  }
})
  .use(PicoVue)
  .mount('#app')
</script>
```
## Documentation
- [PvAlert](./docs.md#PvAlert)
- [PvButton](./docs.md#PvButton)
- [PvConfirm](./docs.md#PvConfirm)
- [PvDarkMode](./docs.md#PvDarkMode)
- [PvDropdown](./docs.md#PvDropdown)
- [PvInputList](./docs.md#PvInputList)
- [PvModal](./docs.md#PvModal)
- [PvMultiSelect](./docs.md#PvMultiSelect)
- [PvTable](./docs.md#PvTable)
- [PvTabs](./docs.md#PvTabs--PvTab)
- [PvTags](./docs.md#PvTags)
- [PvToaster](./docs.md#PvToaster)
