import dompurify from 'isomorphic-dompurify'
import { match, P } from 'ts-pattern'
import type { DirectiveBinding, ObjectDirective } from 'vue'

import { defineNuxtPlugin, useAppConfig } from '#app'
import { constantCase } from '../utils/variableCasing'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { sanitiseHtml } = useAppConfig()

  const sanitiseBindingValueHtml = (binding: DirectiveBinding<HTMLElement>) => {
    const profileName = binding.arg ?? 'default'
    const sanitisationProfile = sanitiseHtml?.profiles?.[profileName] ?? {}

    // Clear all previously registered hooks to prevent hooks from leaking across profiles
    dompurify.removeAllHooks()

    const dompurifyConfig = constantCase(sanitisationProfile.config ?? {})
    const dompurifyHooks = sanitisationProfile.hooks ?? {}

    Object
      .entries(dompurifyHooks)
      .forEach(
        ([entryPoint, hookOrHooks]) =>
          match(hookOrHooks)
            .with(P.array(), (hooks) => {
              // @ts-expect-error TypeScript cannot resolve overloads when the input is a union
              // See https://github.com/microsoft/TypeScript/issues/14107 for details
              hooks.forEach(hook => dompurify.addHook(entryPoint, hook))
            })
            .otherwise((hook) => {
              // @ts-expect-error TypeScript cannot resolve overloads when the input is a union
              // See https://github.com/microsoft/TypeScript/issues/14107 for details
              dompurify.addHook(entryPoint, hook)
            })
      )

    return dompurify.sanitize(binding.value, dompurifyConfig)
  }

  const updateHostElement = (hostElement: HTMLElement, binding: DirectiveBinding<HTMLElement>) => {
    hostElement.innerHTML = sanitiseBindingValueHtml(binding)
  }

  const sanitiseHtmlDirective: ObjectDirective<HTMLElement, HTMLElement> = {
    created: updateHostElement,

    updated: updateHostElement,

    getSSRProps: (binding, _vnode) => ({
      innerHTML: sanitiseBindingValueHtml(binding)
    })
  }

  nuxtApp.vueApp.directive<HTMLElement, HTMLElement>('sanitise-html', sanitiseHtmlDirective)
})
