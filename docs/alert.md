# PvAlert `<PvAlert>|<pv-alert>`
An alert component whose visibility is controlled by whether there's content within it.

## Props
|Name|Type|Default|Details|
|---|---|---|---|
|`type`|String|`null`|Set the alert style type: `success` (green), `error` (red), or `info` (cyan). Default is a gray style based on the "secondary" color defined by Pico CSS|

## Slots
|Name|Details|
|---|---|
|`default`|The content of the alert, which when present shows the alert element|
