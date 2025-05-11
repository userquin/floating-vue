export type DirectiveName = keyof typeof import('floating-vue/directives')

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
