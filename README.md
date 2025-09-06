<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: @benedictleejh/nuxt-sanitise-html
- Description: My new Nuxt module
-->

# Nuxt Sanitise HTML

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for sanitising HTML, as a safe replacement for using `v-html`, protecting against XSS attacks through
sanitising HTML inputs.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@benedictleejh/nuxt-sanitise-html?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- Adds `v-sanitise-html` directive as a safe replacement for `v-html`
- Supports sanitisation profiles to allow configuration as needed for different use cases
- Supports configuring hooks for advanced sanitisation needs

## Setup

<!-- Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @benedictleejh/nuxt-sanitise-html
```

That's it! You can now use Nuxt Sanitise HTML in your Nuxt app ✨ -->
Install the module from NPM using your package manager of choice, e.g. pnpm

```bash
pnpm add -D @benedictleejh/nuxt-sanitise-html
```

Then add the module to your Nuxt config file:

```ts
export default defineNuxtConfig({
  modules: ['@benedictleejh/nuxt-sanitise-html'],
})
```

## Usage

### Basic

The module works without any configuration needed. Just use `v-sanitise-html` instead of `v-html` when you need to
sanitise HTML input. This uses DOMPurify's default configuration for sanitisation.

```vue
<script setup lang="ts">
const xssAttack = `<p>Hello<script>alert('This is an XSS attack!')</` + `script> World</p>`
</script>

<template>
  <div v-sanitise-html="xssAttack" />
</template>
```

The output HTML would be:

```html
<p>HelloWorld</p>
```

You can setup different sanitisaton configurations (profiles) in app config (`app.config.ts`) using the `sanitiseHtml`
key.

```ts
export default defineAppConfig({
  sanitiseHtml: {
    profiles: {
      profileName: {
        config: {
          allowedTags: [
            'h1'
          ]
        }
      }
    }
  }
})
```

The profile names can be used as arguments to `v-sanitise-html` to use that profile instead of the default profile.

```vue
<script setup lang="ts">
const xssAttack = `<p>Hello<script>alert('This is an XSS attack!')</` + `script> World</p>`
</script>

<template>
  <div v-sanitise-html:profileName="xssAttack" />
</template>
```

You can also override the profile used when calling `v-sanitise-html` without arguments by simply setting up a profile
with the name `default`.

```ts
export default defineAppConfig({
  sanitiseHtml: {
    profiles: {
      // This profile is now used when using `v-sanitise-html` without arguments
      default: {
        config: {
          allowedTags: [
            'h1'
          ]
        }
      }
    }
  }
})
```

Profiles consist of 2 parts: the configuration, which is DOMPurify's configuration but with the keys renamed to
camelCase, and the hooks. Please see [DOMPurify documentation](https://github.com/cure53/DOMPurify?tab=readme-ov-file#can-i-configure-dompurify)
for more details the configuration. For the hooks configuration object, the keys are the DOMPurify entry point names,
and the values are either a hook function or an array of hook functions.

```ts
export default defineAppConfig({
  sanitiseHtml: {
    profiles: {
      profileName: {
        config: {
          allowedTags: [
            'h1'
          ],
          ...
        },

        hooks: {
           beforeSanitizeAttributes: (currentNode) => {
            // Do something with the node
          },

          afterSanitizeAttributes: [
            (currentNode) => {
              // Do something with the node
            },

            (currentNode) => {
              // Do another with the node
            }
          ],
          ...
        }
      }
    }
  }
})
```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  pnpm install
  
  # Generate type stubs
  pnpm run dev:prepare
  
  # Develop with the playground
  pnpm run dev
  
  # Build the playground
  pnpm run dev:build
  
  # Run ESLint
  pnpm run lint
  
  # Run Vitest
  pnpm run test
  pnpm run test:watch
  
  # Release new version
  pnpm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@benedictleejh/nuxt-sanitise-html/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@benedictleejh/nuxt-sanitise-html

[npm-downloads-src]: https://img.shields.io/npm/dm/@benedictleejh/nuxt-sanitise-html.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@benedictleejh/nuxt-sanitise-html

[license-src]: https://img.shields.io/npm/l/@benedictleejh/nuxt-sanitise-html.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@benedictleejh/nuxt-sanitise-html

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
