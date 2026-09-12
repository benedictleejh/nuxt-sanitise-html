import { defineConfig as defineLintStagedConfig } from 'lint-staged/config'

export default defineLintStagedConfig({
  '*.{ts,tsx,js,jsx,vue}': stagedFiles => [
    `pnpm lint ${stagedFiles.join(' ')}`
  ],
  '*.{*,1}': () => [
    'pnpm test:types'
  ],
  '*.{*,2}': () => [
    'pnpm test'
  ]
})
