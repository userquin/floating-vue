import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'path'

patchBuild()

/**
 * @param content {string}
 */
function patchFileImports (content) {
  // replace all relative imports adding .mjs or .cjs using previous regex
  // and replacing the last part of the path with .mjs or .cjs
  return content.replace(/from\s+'(.*)';/g, (match, p1) => {
    if (!p1.startsWith('.')) {
      return match
    }
    return match.replace(p1, `${p1}.mjs`)
  })
}

/**
 * @param content {string}
 */
function patchFile (content) {
  return content.replace(/';/g, '.mjs\';')
}

/**
 * @param path {string}
 * @param callback {(content: string) => string}
 */
async function editFile (path, callback) {
  const content = await fs.readFile(path, { encoding: 'utf8' })
  await fs.writeFile(path, callback(content), 'utf-8')
}

/** @param content {string} */
function removeCssImports (content) {
  return content.replace(/import\s+['"]([^'"]+\.css)['"];\s+/g, () => {
    return ''
  })
}

/**
 * @param content {string}
 */
function replaceLocalImports (content) {
  // replace all relative imports adding .mjs or .cjs using previous regex
  // and replacing the last part of the path with .mjs or .cjs
  return patchFileImports(content)
    .replace(/import\("([^'"]+)"\)/g, (match, p1) => {
      if (!p1.startsWith('.')) {
        return match
      }
      return match.replace(p1, `${p1}.mjs`)
    })
}

async function patchBuild () {
  const root = fileURLToPath(new URL('../', import.meta.url))
  const dist = resolve(root, 'dist')
  const components = resolve(dist, 'components')
  const directives = resolve(dist, 'directives')
  const node = resolve(dist, 'node')
  const util = resolve(dist, 'util')
  const dtsFiles = await fs.readdir(components)
  await Promise.all(
    dtsFiles
      .filter(f => f.endsWith('.d.ts'))
      .map((file) => {
        return editFile(
          resolve(components, file),
          content => content
            .replaceAll('import("..").Placement', 'import("../utils").Placement'),
        )
      }),
  )
  await Promise.all([
    // remove static css imports from d.ts files
    editFile(resolve(dist, 'index.d.ts'), content => removeCssImports(content)),
    fs.cp(resolve(dist, 'config.d.ts'), resolve(dist, 'config.d.mts')),
    // vue components
    // fs.cp(resolve(srcComponents, 'Popper.vue'), resolve(components, 'Popper.vue')),
    // fs.cp(resolve(srcComponents, 'PopperContent.vue'), resolve(components, 'PopperContent.vue')),
    // fs.cp(resolve(srcComponents, 'PopperWrapper.vue'), resolve(components, 'PopperWrapper.vue')),
    // fs.cp(resolve(srcComponents, 'TooltipDirective.vue'), resolve(components, 'TooltipDirective.vue')),
    // components
    fs.cp(resolve(dist, 'components.d.ts'), resolve(dist, 'components.d.mts')),
    fs.cp(resolve(components, 'Dropdown.d.ts'), resolve(components, 'Dropdown.d.mts')),
    fs.cp(resolve(components, 'Menu.d.ts'), resolve(components, 'Menu.d.mts')),
    fs.cp(resolve(components, 'Popper.d.ts'), resolve(components, 'Popper.d.mts')),
    fs.cp(resolve(components, 'PopperMethods.d.ts'), resolve(components, 'PopperMethods.d.mts')),
    fs.cp(resolve(components, 'ThemeClass.d.ts'), resolve(components, 'ThemeClass.d.mts')),
    fs.cp(resolve(components, 'Tooltip.d.ts'), resolve(components, 'Tooltip.d.mts')),
    // .vue.d.ts files
    fs.cp(resolve(components, 'Popper.vue.d.ts'), resolve(components, 'Popper.vue.d.mts')),
    fs.cp(resolve(components, 'PopperContent.vue.d.ts'), resolve(components, 'PopperContent.vue.d.mts')),
    fs.cp(resolve(components, 'PopperWrapper.vue.d.ts'), resolve(components, 'PopperWrapper.vue.d.mts')),
    fs.cp(resolve(components, 'TooltipDirective.vue.d.ts'), resolve(components, 'TooltipDirective.vue.d.mts')),
    // directives
    fs.cp(resolve(dist, 'directives.d.ts'), resolve(dist, 'directives.d.mts')),
    fs.rm(resolve(directives, 'v-tooltip.spec.d.ts'), { force: true }),
    fs.cp(resolve(directives, 'v-tooltip.d.ts'), resolve(directives, 'v-tooltip.d.mts')),
    fs.cp(resolve(directives, 'v-close-popper.d.ts'), resolve(directives, 'v-close-popper.d.mts')),
    // utils
    fs.cp(resolve(dist, 'utils.d.ts'), resolve(dist, 'utils.d.mts')),
    fs.cp(resolve(util, 'assign-deep.d.ts'), resolve(util, 'assign-deep.d.mts')),
    fs.cp(resolve(util, 'env.d.ts'), resolve(util, 'env.d.mts')),
    fs.cp(resolve(util, 'events.d.ts'), resolve(util, 'events.d.mts')),
    fs.cp(resolve(util, 'frame.d.ts'), resolve(util, 'frame.d.mts')),
    fs.cp(resolve(util, 'lang.d.ts'), resolve(util, 'lang.d.mts')),
    fs.cp(resolve(util, 'popper.d.ts'), resolve(util, 'popper.d.mts')),
    // unimport presets
    fs.cp(resolve(node, 'types.d.ts'), resolve(node, 'types.d.mts')),
    fs.cp(resolve(dist, 'unimport-presets.d.ts'), resolve(dist, 'unimport-presets.d.mts')),
  ])
  // patch directives dts file
  await Promise.all([
    // patch index.d.ts
    fs.cp(resolve(dist, 'index.d.ts'), resolve(dist, 'index.d.mts')),
    // components
    editFile(resolve(dist, 'components.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'Dropdown.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'Menu.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'Popper.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'Tooltip.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'Popper.vue.d.mts'), content => replaceLocalImports(content)),
    editFile(resolve(components, 'PopperWrapper.vue.d.mts'), content => replaceLocalImports(content)),
    // directives
    editFile(resolve(dist, 'directives.d.mts'), content => patchFile(content)),
    // utils
    editFile(resolve(dist, 'utils.d.mts'), content => patchFile(content)),
    // unimport presets
    editFile(resolve(dist, 'unimport-presets.d.mts'), content => patchFile(content)),
    editFile(resolve(node, 'types.d.mts'), content => patchFile(content)),
  ])

  await editFile(resolve(dist, 'index.d.mts'), content => replaceLocalImports(content))
}
