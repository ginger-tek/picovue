import { PvTable } from './pico-vue.table.js'
import { PvToaster } from './pico-vue.toaster.js'
import { PvModal } from './pico-vue.modal.js'
import { PvTab, PvTabs } from './pico-vue.tabs.js'
import { PvDarkMode } from './pico-vue.dark-mode.js'
import { PvDropdown } from './pico-vue.dropdown.js'

export default {
  install(app) {
    app.component('pv-table', PvTable)
    app.component('pv-toaster', PvToaster)
    app.component('pv-modal', PvModal)
    app.component('pv-tab', PvTab)
    app.component('pv-tabs', PvTabs)
    app.component('pv-dark-mode', PvDarkMode)
    app.component('pv-dropdown', PvDropdown)
  }
}
