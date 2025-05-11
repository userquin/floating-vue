import {
  FloatingVueDirectives,
  enableDirectives,
  prepareFloatingVueComponents,
} from 'floating-vue/unimport-presets'

/**
 * Nuxt module implementation.
 * @param options {import('./nuxt').FloatingVueNuxtOptions}
 * @param _nuxt {import('@nuxt/schema').Nuxt}
 * @returns {Promise<void>}
 */
export default async function (options = {}, _nuxt) {
  const { addPluginTemplate } = await import('@nuxt/kit')

  /** @type {import('@nuxt/schema').Nuxt} */
  const nuxt = (this && this.nuxt) || _nuxt

  const imports = nuxt.options.imports
  imports.addons = enableDirectives(imports.addons)

  nuxt.hook('imports:sources', (sources) => {
    sources.push(
      FloatingVueDirectives(options.directives),
    )
  })

  nuxt.hook('components:extend', async (registry) => {
    const c = prepareFloatingVueComponents(options.components)
    for (const component of c) {
      registry.push({
        pascalName: component.pascalName,
        kebabName: component.kebabName,
        export: component.export,
        filePath: component.filePath,
        shortPath: component.filePath,
        chunkName: component.kebabName,
        prefetch: false,
        preload: false,
        global: false,
        mode: 'all',
      })
    }
  })

  nuxt.options.css.push('floating-vue/dist/style.css')

  addPluginTemplate({
    filename: 'floating-vue.mjs',
    getContents: () => `
      import { defineNuxtPlugin } from '#imports'
      import FloatingVue from 'floating-vue'
      
      export default defineNuxtPlugin((nuxtApp) => {
        // @TODO cutomization
        nuxtApp.vueApp.use(FloatingVue)
      })
    `,
  })

  // @TODO remove when floating-ui supports native ESM
  nuxt.options.build.transpile.push('floating-vue', '@floating-ui/core', '@floating-ui/dom')

  // SSR support for v-tooltip directive
  nuxt.options.vue.compilerOptions.directiveTransforms = nuxt.options.vue.compilerOptions.directiveTransforms || {}
  nuxt.options.vue.compilerOptions.directiveTransforms.tooltip = () => ({
    props: [],
    needRuntime: true,
  })
}
