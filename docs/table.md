# PvTable `<pv-table>`
A responsive, generative table for rendering data, with custom field rendering and filtering.

### Props
|Name|Type|Default|Details|
|---|---|---|---|
|`items`|Array|`[]`|Array of objects to show. If unset, shows empty data message|
|`fields`|Array|`[]`|Array of specified fields to show. If unset, the first item's keys will be used|
|`filter`|Boolean|`false`|Switch for toggling the header filters|
|`filter-opts`|Object|`{}`|Sets filter options for specified fields' header filters. See section below for details|
|`bordered`|Boolean|`false`|Sets a border around the table|
|`striped`|Boolean|`false`|Sets the [striped rows class](https://picocss.com/docs/table#striped) on the table|
|`busy`|Boolean|`false`|Toggles hiding the rows of the table and displaying a busy message|

### Slots
|Name|Details|
|---|---|
|`<template #{field-name}="{fieldName}">`|Allows for custom rendering for a given field via its kebab-case equivalent, i.e. `myProp` would by `my-prop` for the template name. The value of the template binding is the row object to use in your rendering|
|`<template #empty>`|Allows for custom rendering of the empty data message; defaults to "No data"|
|`<template #empty-filtered>`|Allows for custom rendering of the empty filtered data message; defaults to "No items by that filter"|
|`<template #busy>`|Allows for custom rendering of the busy message; defaults to a [loading spinner](https://picocss.com/docs/loading)|

### Custom Filtering Options
When the `filter` switch is present, the table column headers will be replaced with text inputs for each field. These type-to-filter inputs can have suggested values shown via the `filterOpts` prop.

The object schema for `filterOpts` must include a property called `datalist`, whose property keys are the specified field and values are an array of string options to show:
```js
{
  datalist: {
    firstName: ['Bob', 'Joe', 'Stan'],
    jobTitle: ['Manager', 'Engineer']
  }
}
```
