import './pv-common.css'
import PvTable from './PvTable.vue'
import PvDarkMode from './PvDarkMode.vue'
import PvModal from './PvModal.vue'
import PvDropdown from './PvDropdown.vue'
import PvInputList from './PvInputList.vue'
import PvMultiSelect from './PvMultiSelect.vue'
import PvTags from './PvTags.vue'
import PvTabs from './PvTabs.vue'
import PvTab from './PvTab.vue'
import PvToaster, { appendToast, removeToast } from './PvToaster.vue'
import PvAlert from './PvAlert.vue'
import PvButton from './PvButton.vue'
import PvConfirm from './PvConfirm.vue'

function install(app) {
  app.component('PvTable', PvTable)
  app.component('PvDarkMode', PvDarkMode)
  app.component('PvModal', PvModal)
  app.component('PvDropdown', PvDropdown)
  app.component('PvInputList', PvInputList)
  app.component('PvMultiSelect', PvMultiSelect)
  app.component('PvTags', PvTags)
  app.component('PvTabs', PvTabs)
  app.component('PvTab', PvTab)
  app.component('PvToaster', PvToaster)
  app.component('PvAlert', PvAlert)
  app.component('PvButton', PvButton)
  app.component('PvConfirm', PvConfirm)
  app.provide('appendToast', appendToast)
  app.provide('removeToast', removeToast)
}

export default {
  install,
  PvTable,
  PvDarkMode,
  PvModal,
  PvDropdown,
  PvInputList,
  PvMultiSelect,
  PvTags,
  PvTabs,
  PvTab,
  PvToaster,
  PvAlert,
  PvButton,
  PvConfirm,
  appendToast,
  removeToast
}