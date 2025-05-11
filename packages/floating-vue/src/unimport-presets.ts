import type { DirectiveName, FloatingVueDirectivesOptions } from './node/types'
import type { InlinePreset, PresetImport } from 'unimport'
import { DirectiveNames } from './node/types'

export type { DirectiveName, FloatingVueDirectivesOptions }

export function FloatingVueDirectives (options: FloatingVueDirectivesOptions = {}) {
  const { exclude, prefix } = options

  const useDirectives = DirectiveNames.filter(entry => !exclude || !exclude.includes(entry))

  return {
    from: 'floating-vue/directives',
    meta: {
      vueDirective: true,
    },
    imports: useDirectives.map<PresetImport>((name) => ({
      name,
      as: prefix ? `FloatingVue${name}` : undefined,
      meta: {
        vueDirective: true,
        docsUrl: 'https://floating-vue.starpad.dev/guide/directive',
      },
    })),
  } satisfies InlinePreset
}
