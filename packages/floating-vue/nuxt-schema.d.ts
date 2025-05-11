// only for build, excluded from the package
declare module '@nuxt/schema' {
  import type { InlinePreset, UnimportOptions } from 'unimport'
  export type HookResult = Promise<void> | void
  export interface ImportPresetWithDeprecation extends InlinePreset {
  }
  export interface ImportsOptions extends UnimportOptions {}
  export interface Component {
    pascalName: string;
    kebabName: string;
    export: string;
    filePath: string;
    shortPath: string;
    chunkName: string;
    prefetch: boolean;
    preload: boolean;
    global?: boolean;
    island?: boolean;
    mode?: 'client' | 'server' | 'all';
    /**
     * This number allows configuring the behavior of overriding Nuxt components.
     * If multiple components are provided with the same name, then higher priority
     * components will be used instead of lower priority components.
     */
    priority?: number;
  }
  export interface NuxtHooks {
    'imports:sources': (presets: ImportPresetWithDeprecation[]) => HookResult
    'components:extend': (components: Component[]) => HookResult
  }
  export interface Nuxt {
    options: {
      build: {
        transpile: string[]
      }
      css: string[]
      imports: ImportsOptions
    }
    hook: <H extends keyof NuxtHooks>(hook: H, callback: NuxtHooks[H]) => void
  }
}
