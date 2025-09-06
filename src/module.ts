import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

import type { SanitiseHtmlOptions } from './types/module'

export * from './types/module'

export default defineNuxtModule<SanitiseHtmlOptions>({
  meta: {
    name: '@benedictleejh/nuxt-sanitise-html',
    configKey: 'sanitiseHtml',
    version: '1.0.0'
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/app/plugins/sanitiseHtml'))
  }
})
