import * as components from 'floating-vue/components'
import * as directives from 'floating-vue/directives'

export type ComponentName = keyof typeof import('floating-vue/components')
export type DirectiveName = keyof typeof import('floating-vue/directives')
export const ComponentNames = Object.keys(components) as ComponentName[]
export const DirectiveNames = Object.keys(directives) as DirectiveName[]

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
