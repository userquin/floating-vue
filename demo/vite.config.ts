import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { FloatingVueDirectives } from 'floating-vue/unimport-presets'
import { resolve }  from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      'floating-vue/style.css': resolve('./node_modules/floating-vue/dist/style.css'),
      'floating-vue/dist/style.css': resolve('./node_modules/floating-vue/dist/style.css'),
      'floating-vue/components': resolve('./node_modules/floating-vue/components.mjs'),
      'floating-vue/directives': resolve('./node_modules/floating-vue/directives.mjs'),
      'floating-vue': resolve('./node_modules/floating-vue/dist/index.mjs'),
    }
  },
  define: {
    'VERSION': JSON.stringify('0.0.0'),
  },
  plugins: [
    vue(),
      AutoImport({
        imports: [
          FloatingVueDirectives(),
        ],
        dts: true,
        vueDirectives: true,
      })
  ],
})
