import type {
  DirectiveName,
  ComponentName,
  FloatingVueDirectivesOptions,
  FloatingVueComponentsOptions,
} from './node/types'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import { ComponentNames, DirectiveNames } from './node/types'

export type { ComponentName, DirectiveName, FloatingVueDirectivesOptions, FloatingVueComponentsOptions }

export interface FloatingVueResolverOptions {
  /**
     * Directives to exclude.
     */
  excludeDirectives?: DirectiveName[]
  /**
     * Components to exclude.
     */
  excludeComponents?: ComponentName[]
  /**
     * Prefix components.
     */
  prefixComponents?: true
  /**
     * Prefix directives.
     */
  prefixDirectives?: true
}

/**
 * FloatingVue directives and components factory resolver for `unplugin-vue-components`.
 *
 * @param options The options for directives and components.
 */
export function FloatingVueResolver (options: FloatingVueResolverOptions = {}) {
  const {
    excludeDirectives,
    excludeComponents,
    prefixComponents,
    prefixDirectives,
  } = options

  return {
    FloatingVueDirectiveResolver: createDirectivesResolver(
      { exclude: excludeDirectives, prefix: prefixDirectives },
    ),
    FloatingVueComponentResolver: createComponentsResolver(
      { exclude: excludeComponents, prefix: prefixComponents },
    ),
  }
}

/**
 * FloatingVue directives resolver for `unplugin-vue-components`.
 *
 * @param options The directives options.
 */
export function FloatingVueDirectiveResolver (options: FloatingVueDirectivesOptions = {}) {
  return createDirectivesResolver(options)
}

/**
 * FloatingVue components resolver for `unplugin-vue-components`.
 *
 * @param options The components options.
 */
export function FloatingVueComponentResolver (options: FloatingVueComponentsOptions = {}) {
  return createComponentsResolver(options)
}

/**
 * Create a resolver for FloatingVue components.
 *
 * @param options The components options.
 */
function createComponentsResolver (
  options: FloatingVueComponentsOptions,
) {
  const { exclude, prefix } = options
  return {
    type: 'component',
    resolve: async (name) => {
      let floatingVueName = name
      if (prefix) {
        if (!name.startsWith('FloatingVue')) {
          return undefined
        }
        floatingVueName = `V${name.slice('FloatingVue'.length)}`
        if (!ComponentNames.includes(floatingVueName as ComponentName)) {
          floatingVueName = floatingVueName.slice(1)
        }
      }
      if (exclude?.some(e => e === floatingVueName)) {
        return undefined
      }

      if (!ComponentNames.includes(floatingVueName as ComponentName)) {
        return undefined
      }
      return {
        name: floatingVueName,
        as: prefix ? name : undefined,
        type: 'component',
        from: 'floating-vue/components',
      }
    },
  } satisfies ComponentResolver
}

/**
 * Create a resolver for FloatingVue directives.
 *
 * @param options The directives options.
 */
function createDirectivesResolver (
  options: FloatingVueDirectivesOptions,
) {
  const { exclude, prefix } = options
  // Vue will transform v-<directive> to _resolveDirective('<directive>')
  // If prefix enabled, Vue will transform v-floating-vue-<directive> to _resolveDirective('floating-vue-<directive>')
  // unplugin-vue-components will provide the correct import when calling resolve: PascalCase(<directive>)
  // If prefix enabled, unplugin-vue-components will provide PascalCase(floating-vue-<directive>)
  return {
    type: 'directive',
    resolve: async (resolvedName) => {
      let name = resolvedName
      if (prefix) {
        if (!name.startsWith('FloatingVue')) {
          return undefined
        }
        name = name.slice('FloatingVue'.length)
      }
      if (exclude?.some(e => e === name)) {
        return undefined
      }
      const directive = DirectiveNames.includes(name as DirectiveName)
      if (!directive) {
        return undefined
      }

      return {
        name,
        as: prefix ? resolvedName : undefined,
        from: `floating-vue/directives`,
      }
    },
  } satisfies ComponentResolver
}
