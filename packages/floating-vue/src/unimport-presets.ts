import type { DirectiveName } from './directives'
import type { FloatingVueComponentsOptions, FloatingVueDirectivesOptions } from './node/types'
import type { Addon, AddonsOptions, InlinePreset, PresetImport } from 'unimport'
import { DirectiveNames } from './directives'
import { ComponentNames } from 'floating-vue/components'

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

export function enableDirectives (addons?: AddonsOptions | Addon[]): AddonsOptions {
  if (!addons) {
    return { vueDirectives: true }
  }

  if (Array.isArray(addons)) {
    return { vueDirectives: true, addons }
  }

  return {
    ...addons,
    vueDirectives: addons.vueDirectives ?? true,
    addons: addons.addons,
  }
}

export interface FloatingVueComponentInfo {
  pascalName: string
  kebabName: string
  export: string
  filePath: string
}

export function prepareFloatingVueComponents (options: FloatingVueComponentsOptions = {}) {
  const { prefix = false, exclude = [] } = options
  const info: FloatingVueComponentInfo[] = []
  for (const component of ComponentNames) {
    if (exclude.includes(component)) {
      continue
    }

    const useName = prefix
      ? `FloatingVue${component[0] === 'V' ? component.slice(1) : component}`
      : component

    info.push({
      pascalName: useName,
      kebabName: toKebabCase(useName),
      export: component,
      filePath: `floating-vue/components`,
    })
  }

  return info
}

function toKebabCase (str: string) {
  return str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
}
