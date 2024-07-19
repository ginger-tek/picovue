import PvTable from './picovue.table.js'
import PvToaster from './picovue.toaster.js'
import PvModal from './picovue.modal.js'
import PvTabs from './picovue.tabs.js'
import PvDarkMode from './picovue.dark-mode.js'
import PvDropdown from './picovue.dropdown.js'

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
