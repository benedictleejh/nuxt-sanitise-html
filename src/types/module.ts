import type DOMPurify from 'dompurify'
import type { Config } from 'dompurify'
import type { Directive } from 'vue'

import type { KeysToCamelCase } from '../runtime/app/utils/variableCasing'
import type { OverloadParameters } from '../utils/overloads'
import type { Prettify } from '../utils/prettify'

type DOMPurifyConfig = Prettify<KeysToCamelCase<Config, '_'>>

type AddHookParameters = OverloadParameters<typeof DOMPurify.addHook>
type DOMPurifyHooks = {
  // Credit to https://stackoverflow.com/a/76700498
  [key in AddHookParameters[0]]?: (AddHookParameters & [key, unknown])[1]
}

type SanitiseHtmlProfiles = {
  [key in 'default' | string & {}]?: {
    config?: DOMPurifyConfig
    hooks?: DOMPurifyHooks
  }
}

export interface SanitiseHtmlOptions {
  profiles?: SanitiseHtmlProfiles
}

declare module 'nuxt/schema' {
  interface AppConfig {
    sanitiseHtml?: {
      profiles?: SanitiseHtmlProfiles
    }
  }
}

declare module 'vue' {
  interface GlobalDirectives {
    vSanitiseHtml: Directive<HTMLElement>
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
