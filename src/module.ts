import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

import { name, version } from '../package.json'
import type { SanitiseHtmlOptions } from './types/module'

export * from './types/module'

export default defineNuxtModule<SanitiseHtmlOptions>({
  meta: {
    name,
    configKey: 'sanitiseHtml',
    version
  },

  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/app/plugins/sanitiseHtml'))
  }
})
