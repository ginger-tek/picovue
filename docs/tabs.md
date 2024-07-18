# PvTabs `<pv-tabs>`
A responsive tabs component.

## Props
|Name|Type|Default|Details|
|---|---|---|---|
|`stretch`|Boolean|`false`|Stretch the tab buttons across the header|

## Slots
|Name|Details|
|---|---|
|`<pv-tab title="My Tab">...</pv-tab>`|Each direct `<pv-tab>` component will render a new tab button and content slot to show/hide|

---

# PvTab `<pv-tab>`
A tab component with optional state persistance.

## Props
|Name|Type|Default|Details|
|---|---|---|---|
|`title`|String|`'Tab'`|The string used to label the tab's button. Can include HTML elements|
|`disabled`|Boolean|`false`|Disables the tab|
|`persist`|Boolean|`false`|Persists the current slot's content state between tab switches using Vue's [`<keep-alive>`](https://vuejs.org/guide/built-ins/keep-alive) component|