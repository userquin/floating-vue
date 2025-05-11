import type { ComponentName } from 'floating-vue/components'
import type { DirectiveName } from '../directives'

export interface FloatingVueDirectivesOptions {
  /**
   * Prefix FloatingVue directives (to allow users to use other directives with the same name):
   * - when prefix set to `true` will use `FloatingVue` => `v-floating-vue-<directive>: `v-floating-vue-tooltip`.
   */
  prefix?: true
  /**
   * Directives to exclude.
   */
  exclude?: DirectiveName[]
}

export interface FloatingVueComponentsOptions {
  /**
   * Prefix FloatingVue components (to allow users to use other components with the same name):
   * - when prefix set to `true` will use `FloatingVue` => `FloatingVue<component>: `FloatingVueTooltip`.
   */
  prefix?: true
  /**
   * Components to exclude.
   */
  exclude?: ComponentName[]
}
