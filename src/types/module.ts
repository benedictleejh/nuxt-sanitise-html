import type DOMPurify from 'isomorphic-dompurify'
import type { Config } from 'isomorphic-dompurify'
import type { ObjectDirective } from 'vue'

import type { KeysToCamelCase } from '../runtime/app/utils/variableCasing'
import type { OverloadParameters } from '../utils/overloads'
import type { Prettify } from '../utils/prettify'

export type DOMPurifyConfig = Prettify<KeysToCamelCase<Config, '_'>>

type AddHookParameters = OverloadParameters<typeof DOMPurify.addHook>
export type DOMPurifyHooks = {
  // Credit to https://stackoverflow.com/a/76700498
  [key in AddHookParameters[0]]?: (AddHookParameters & [key, unknown])[1] | (AddHookParameters & [key, unknown])[1][]
}

export type SanitiseHtmlProfiles = {
  [key in 'default' | string & {}]?: {
    config?: DOMPurifyConfig
    hooks?: DOMPurifyHooks
  }
}

// Due to a limitation in Nuxt, functions cannot be used easily at runtime when defined in Nuxt config,
// see https://github.com/nuxt/nuxt/issues/18762. As such, to keep things simple, we only allow configuration in
// app config
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SanitiseHtmlOptions {}

declare module 'nuxt/schema' {
  interface AppConfigInput {
    sanitiseHtml?: {
      profiles?: SanitiseHtmlProfiles
    }
  }

  interface AppConfig {
    sanitiseHtml?: {
      profiles?: SanitiseHtmlProfiles
    }
  }
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    sanitiseHtml?: {
      profiles?: SanitiseHtmlProfiles
    }
  }

  interface AppConfig {
    sanitiseHtml?: {
      profiles?: SanitiseHtmlProfiles
    }
  }
}

declare module 'vue' {
  interface GlobalDirectives {
    vSanitiseHtml: ObjectDirective<HTMLElement, string | Node>
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
