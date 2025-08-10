import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

import type { SanitiseHtmlOptions } from './types/module'

export * from './types/module'

export default defineNuxtModule<SanitiseHtmlOptions>({
  meta: {
    name: '@benedictleejh/nuxt-sanitise-html',
    configKey: 'sanitiseHtml'
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    if (options.profiles) {
      nuxt.options.appConfig = {
        ...nuxt.options.appConfig,
        sanitiseHtml: {
          profiles: options.profiles
        }
      }
    }

    addPlugin(resolver.resolve('./runtime/app/plugins/sanitiseHtml'))
  }
})
