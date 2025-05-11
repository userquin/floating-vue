import { assign } from './util/assign-deep'
import { config, FloatingVueConfig } from './config'
import 'vue-resize/dist/vue-resize.css'
import './style.css'

// Components
import PrivateDropdown from './components/Dropdown'
import PrivateMenu from './components/Menu'
import PrivateTooltip from './components/Tooltip'
// Directives
import PrivateVTooltip from './directives/v-tooltip'
import PrivateVClosePopper from './directives/v-close-popper'

/* Exports */
export const options = config
export { createTooltip, destroyTooltip } from './directives/v-tooltip'

/* Vue plugin */
export function install (app, options: FloatingVueConfig = {}) {
  if (app.$_vTooltipInstalled) return
  app.$_vTooltipInstalled = true

  assign(config, options)

  // Directive
  app.directive('tooltip', PrivateVTooltip)
  app.directive('close-popper', PrivateVClosePopper)
  // Components
  app.component('VTooltip', PrivateTooltip)
  app.component('VDropdown', PrivateDropdown)
  app.component('VMenu', PrivateMenu)
}

const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
  options: config,
}

export default plugin
