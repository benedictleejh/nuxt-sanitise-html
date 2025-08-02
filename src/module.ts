import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface SanitiseHtmlOptions {}

export default defineNuxtModule<SanitiseHtmlOptions>({
  meta: {
    name: '@benedictleejh/nuxt-sanitise-html',
    configKey: 'sanitiseHtml'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `pnpm prepack`
    addPlugin(resolver.resolve('./runtime/app/plugins/plugin'))
  }
})
