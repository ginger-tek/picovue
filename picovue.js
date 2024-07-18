import PvTable from './pico-vue.table.js'
import PvToaster from './pico-vue.toaster.js'
import PvModal from './pico-vue.modal.js'
import PvTabs from './pico-vue.tabs.js'
import PvDarkMode from './pico-vue.dark-mode.js'
import PvDropdown from './pico-vue.dropdown.js'

export default {
  install(app) {
    PvTable.install(app)
    PvToaster.install(app)
    PvModal.install(app)
    PvTabs.install(app)
    PvDarkMode.install(app)
    PvDropdown.install(app)
  }
}
