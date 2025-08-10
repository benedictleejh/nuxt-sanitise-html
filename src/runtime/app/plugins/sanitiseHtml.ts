import DOMPurify from 'dompurify'
import type { DirectiveBinding } from 'vue'

import { defineNuxtPlugin, useAppConfig } from '#app'
import { constantCase } from '../utils/variableCasing'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { sanitiseHtml } = useAppConfig()

  const dompurify = import.meta.client
    ? DOMPurify(window)
    : DOMPurify(new (await import('jsdom')).JSDOM().window)

  const sanitise = (binding: DirectiveBinding) => {
    const profileName = binding.arg ?? 'default'
    const sanitisationProfile = sanitiseHtml?.profiles?.[profileName]

    // Clear all previously registered hooks to prevent hooks from leaking across profiles
    dompurify.removeAllHooks()

    if (!sanitisationProfile) {
      return dompurify.sanitize(binding.value)
    }

    const dompurifyConfig = constantCase(sanitisationProfile.config)
    const dompurifyHooks = sanitisationProfile.hooks

    if (dompurifyHooks) {
      // @ts-expect-error TypeScript cannot resolve overloads when the input is a union
      // See https://github.com/microsoft/TypeScript/issues/14107 for details
      Object.entries(dompurifyHooks).forEach(hook => dompurify.addHook(...hook))
    }

    return dompurify.sanitize(binding.value, dompurifyConfig)
  }

  nuxtApp.vueApp.directive<HTMLElement>('sanitise-html', {
    created(el, binding) {
      el.innerHTML = sanitise(binding)
    },
    updated(el, binding) {
      el.innerHTML = sanitise(binding)
    },
    getSSRProps(binding, _vnode) {
      return {
        innerHTML: sanitise(binding)
      }
    }
  })
})
