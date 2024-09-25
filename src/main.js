import PvTable from './PvTable.vue'
import PvDarkMode from './PvDarkMode.vue'
import PvModal from './PvModal.vue'
import PvDropdown from './PvDropdown.vue'
import PvMultiSelect from './PvMultiSelect.vue'
import PvTabs from './PvTabs.vue'
import PvTab from './PvTab.vue'
import PvToaster, { appendToast } from './PvToaster.vue'
import PvAlert from './PvAlert.vue'

export default {
  install(app) {
    app.component('pv-table', PvTable)
    app.component('pv-dark-mode', PvDarkMode)
    app.component('pv-modal', PvModal)
    app.component('pv-dropdown', PvDropdown)
    app.component('pv-multi-select', PvMultiSelect)
    app.component('pv-tabs', PvTabs)
    app.component('pv-tab', PvTab)
    app.component('pv-toaster', PvToaster)
    app.component('pv-alert', PvAlert)
  },
  PvTable,
  PvDarkMode,
  PvModal,
  PvDropdown,
  PvTabs,
  PvTab,
  PvToaster,
  PvAlert,
  appendToast
}