# PvAlert
```html
<PvAlert variant="String"></PvAlert>
```
Alert is hidden when empty and shows when not empty
## Attributes
### Variant
- `success` (green)
- `info` (blue)
- `warning` (yellow)
- `danger` (red)

# PvButton
```html
<PvButton busy="Boolean" variant="String"></PvAlert>
```
## Attributes
### Busy
- `true|false`
### Variant
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
/>
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

# PvInputList
```html
<PvInputList
  v-model="Any"
  :items="Array | Function"
  :debounce="Number"
  :placeholder="String"
/>
```
## Attributes
### Items
When items is set to a function, each debounced key input will call the function and be passed the current input value as an argument. The function must return an array of objects with `label` and `value` properties, which will be used to render the list items and set the selected value, respectively.
```js
function getItems(value) {
  const res = await fetch('/ajax-search?text=' + value).then(r => r.json())
  return res.map(data => ({
    label: data.displayName,
    value: data
  }))
}
```
### Debounce
The default debounce interval is 250ms, but a different value can be set on the `debounce` attribute.
### Placeholder
The placeholder attribute operates the same as a regular HTML text input.

# PvModal
```html
<PvModal
  v-model="Boolean"
  ref="Reference"
  hide-close="Switch"
>
  ...
</PvModal>
```
Use `v-model` to toggle showing/hiding or the modal:
```html

```
```js
const toggle = ref(false)

toggle.value = true // open modal
toggle.value = false // close modal
```
Or set a component ref and call the `openModal()`/`closeModal()` methods
```html
<PvModal ref="myModalRef">
<button @click="myModalRef.openModal()">Open Modal</button>
```
## Slots
```html
<template #heading>
  <b>My Modal</b>
</template>
```

# PvMultiSelect
```html
<PvMultiSelect
  v-model="Mixed"
  items="Array<String|Object>"
>
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
  {{ someProp }}
</template>
```

# PvTabs / PvTab
```html
<PvTabs persist="Switch">
  <PvTab
    hidden="Boolean"
    disabled="Boolean"
    selected="Boolean"
  >
    <template #title>
      First Tab
    </template>
    ...
  </PvTab>
  ...
</PvTabs>
```

# PvTags
```html
<PvTags v-model="Array"></PvTags>
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
const appendToast = inject('appendToast')
// or
const { appendToast } = PicoVue
// or
PicoVue.appendToast()
```
**Constructor**
```
appendToast(body: String, { variant: String, stay: Boolean, dismissAfter: Number, id: String }: ?Object)
```
**Options:**
- `variant`: Default none (gray)
  - `success` (green)
  - `info` (blue)
  - `warning` (yellow)
  - `danger` (red)
- `id`: Default `pv-toaster`
- `stay`: Default `false`
- `dismissAfter`: Default `5` seconds

# confirmAsync
Opens a dynamically created modal dialog for confirming an action, waits asynchronously for a response, then returns a boolean result. Canceling or escaping the modal returns false. If the second argument not specified, modal title defaults to 'Confirm'.
```js
const confirmAsync = inject('confirmAsync')
// or
const { confirmAsync } = PicoVue
// or
PicoVue.confirmAsync()
```
**Constructor**
```
confirmAsync(message: String, title: ?String)
```
Example:
```html
<button @click="doAction">Confirm</button>
```
```js
async function doAction() {
  const result = await confirmAsync('Are you sure?')
  if (!result) return
  // ...
}
```