import ClosePopper from './directives/v-close-popper'
import Tooltip from './directives/v-tooltip'

export { ClosePopper, Tooltip }

export const DirectiveNames = ['ClosePopper', 'Tooltip'] as const
export type DirectiveName = typeof DirectiveNames[number]
