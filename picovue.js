import { PvTable } from './picovue.table.js'
import { PvToaster } from './picovue.toaster.js'
import { PvModal } from './picovue.modal.js'
import { PvTab, PvTabs } from './picovue.tabs.js'
import { PvDarkMode } from './picovue.dark-mode.js'
import { PvDropdown } from './picovue.dropdown.js'

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
