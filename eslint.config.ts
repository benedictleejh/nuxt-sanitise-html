// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: {
      commaDangle: 'never',
      semi: false
    }
  },

  dirs: {
    src: [
      './playground'
    ]
  }
})
  .append(
    {
      rules: {
        'import/order': [
          'error',
          {
            'groups': [
              'builtin',
              'external',
              'internal'
            ],
            'newlines-between': 'always',
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true
            }
          }
        ]
      }
    },
    {
      files: [
        '**/pages/**/*'
      ],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  )
