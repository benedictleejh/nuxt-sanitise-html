import type { Configuration } from 'lint-staged'

export default {
  '*.{ts,tsx,js,jsx,vue}': stagedFiles => [
    `pnpm lint ${stagedFiles.join(' ')}`
  ],
  '*.{*,1}': () => [
    'pnpm test:types'
  ],
  '*.{*,2}': () => [
    'pnpm test'
  ]
} satisfies Configuration
