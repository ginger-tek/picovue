## PvToaster `<pv-toaster>`
A toaster container component

## Props
|Name|Type|Default|Details|
|---|---|---|---|
|`id`|String|`'pv-toaster'`|The id of the toaster container|
|`position`|String|`'top-center'`|Sets the position of the toaster container. Valid values include: `top-left`, `top-center`, `top-right`, `bottom-left`, |

## Methods
### `pv_appendToast(body, opts = { dismissAfter = 5, stay = false, type = null, id = 'pv-toaster' })`
Appends new toasts to the target toaster container. To access this method, use Vue's [`inject()`](https://vuejs.org/guide/components/provide-inject#inject) method to bring it into your context:
```js
const appendToast = Vue.inject('pv_appendToast')

appendToast('Hello!', { type: 'success' })
```

#### Parameter Properties
|Name|Type|Default|Details|
|---|---|---|---|
|`body`|String|Required|The content of the toast|
|`dismissAfter`|Integer|`5`|Number of seconds to wait before auto-dismissing the toast|
|`stay`|Boolean|`false`|Disables auto-dismissing; toast must be manually dismissed|
|`type`|String|`null`|Styles the toast; options include `success`, `error`, or `info`|
|`id`|String|`'pv-toaster'`|Targets a specific toaster container by id|
