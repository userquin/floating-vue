import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/components.ts'),
        resolve(__dirname, './src/directives.ts'),
        resolve(__dirname, './src/utils.ts'),
        resolve(__dirname, './src/unimport-presets.ts'),
        resolve(__dirname, './src/unplugin-vue-components-resolvers.ts'),
      ],
    },
    rollupOptions: {
      external: [
        'vue',
        '@floating-ui/dom',
        'unimport',
        'floating-vue/directives',
        'floating-vue/components',
      ],
    },
  },
  define: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    VERSION: JSON.stringify(require('./package.json').version),
  },
})
