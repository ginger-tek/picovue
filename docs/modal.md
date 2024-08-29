# PvModal `<PvModal>|<pv-modal>`
An animated, modal component

## Props
|Name|Type|Default|Details|
|---|---|---|---|
|`v-model`|Boolean|`false`|Binds a boolean variable for opening and closing the modal|
|`hide-close`|Boolean|`false`|Toggles showing the close ("X") button icon in the modal header; useful for when you have your own close button within|

## Slots
|Name|Details|
|---|---|
|`header`|The text or html to be shown in the header of the modal. Default value is `Modal`|
|`default`|The content of the modal body|
