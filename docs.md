# PvAlert
```html
<PvAlert type="String"></PvAlert>
```
Alert is hidden when empty and shows when not empty
## Attributes
### Type
- `success` (green)
- `info` (blue)
- `warning` (yellow)
- `danger` (red)

# PvDarkMode
```html
<PvDarkMode persist="Switch"/>
```

# PvDropdown
```html
<PvDropdown
  v-model="Mixed"
  items="Array<String|Object>"
>
</PvDropdown>
```
## Slots
Default label when unselected is `Select one`. Default value when selected is the selected value as is. You can override the 
```html
<PvDropdown>
  Select a thing!
  <template #selected="selected">{{ selected }}</template>
</PvDropdown>
```
## Attributes
### Items
```js
const items = [
  'foo',
  'bar'
  { text: 'foo', value: 'bar' },
  { text: 'link text', href: 'https://link.to/something' },
]
```

# PvModal
```html
<PvModal
  v-model="Boolean"
  hide-close="Switch"
>
  ...
</PvModal>
```
## Slots
```html
<template #heading>
  <b>My Modal</b>
</template>
```
## Controls
```js
const toggle = ref(false)

toggle.value = true // open modal
toggle.value = false // close modal
```

# PvMultiSelect
```html
<PvMultiSelect
  v-model="Mixed"
  items="Array<String|Object>"
>
</PvMultiSelect>
```
## Slots
Default label when no values are selected is `Select one or more`. Default value when selected is the selected values as is. You can override the formatting using the `selected` slot.
```html
<PvMultiSelect v-model="selectedItems">
  Select some things!
  <template #selected>
    {{ selectedItems.join(', ') }}
  </template>
</PvMultiSelect>
```
## Attributes
### Items
```js
const items = [
  'foo',
  'bar'
  { text: 'foo', value: 'bar' }
]
```

# PvTable
```html
<PvTable
  items="Array<Object>",
  fields="Array<Object|String>"
  filter="Switch"
  filter-opts="Object"
  sort="Switch"
  bordered="Switch"
  striped="Switch"
  busy="Switch"
/>
```
## Attributes
### Fields
```js
const fields = [
  'property',
  { name: 'property', label: 'Foobar' },
  { name: 'property', align: 'left|center|right' },
]
```
### Filter Options
Provide auto-suggest to the filter input fields by setting the `datalist` option:
```js
const filterOpts = {
  datalist: {
    fieldName: ['value 1', 'value 2',]
  }
}
```
## Slots
```html
<template #property="{property,anotherProperty}">
  {{ property }} {{ anotherProperty }}
</template>
```
NOTE: If a property is in `camelCase`, the template name must use `kebab-case` to match properly
```html
<template #some-prop="{someProp}">
  {{ property }}
</template>
```

# PvTabs
```html
<PvTabs persist="Switch">
  <PvTab title="String">
    ...
  </PvTab>
</PvTabs>
```

# PvToaster
```html
<PvToaster
  id="String"
  position="String"
/>
```
## Attributes
### Position
- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## Methods
### appendToast
```js
import { appendToast } from 'PvToaster.vue'
// or
const { appendToast } = PicoVue
// or
PicoVue.appendToast()
```
**Constructor**
```
appendToast(body: String, { type: String, stay: Boolean, dismissAfter: Number, id: String }: ?Object)
```
**Options:**
- `type`: Default none (gray)
  - `success` (green)
  - `info` (blue)
  - `warning` (yellow)
  - `danger` (red)
- `id`: Default `pv-toaster`
- `stay`: Default `false`
- `dismissAfter`: Default `5` seconds
