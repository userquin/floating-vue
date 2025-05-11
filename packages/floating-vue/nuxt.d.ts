import type { defineNuxtModule } from '@nuxt/kit'
import type { FloatingVueDirectivesOptions } from 'floating-vue/directives'
import type { FloatingVueComponentsOptions } from 'floating-vue/components'

export interface FloatingVueNuxtOptions {
  directives?: FloatingVueDirectivesOptions
  components?: FloatingVueComponentsOptions
}

const _default: ReturnType<typeof defineNuxtModule>

export default _default