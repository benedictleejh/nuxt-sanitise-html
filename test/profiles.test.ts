import { fileURLToPath } from 'node:url'

import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/profiles', import.meta.url))
  })

  describe('when using a profile that allows new tab links', async () => {
    it('allow the link and make it safe', async () => {
      const html = await $fetch('/')

      expect(html).toMatch(`<a href="/" target="_blank" rel="noopener noreferrer">hello</a>`)
    })
  })

  describe('hooks do not leak across profiles', async () => {
    it('should allow new tab link only in right profile', async () => {
      const html = await $fetch('/no-hook-leak')

      expect(html).toMatch(`<div><a href="/" target="_blank" rel="noopener noreferrer">hello</a></div><div><a href="/">hello</a></div>`)
    })
  })

  describe('when using a profile only allowing h1 tags', async () => {
    it('should only have h1 tags', async () => {
      const html = await $fetch('/only-h1')

      expect(html).toMatch(`<div>Hello Worlda link<h1>My World</h1></div></div>`)
    })
  })

  describe('when using the default profile', async () => {
    it('should only have h1 tags when the default profile is set to only allow h1 tags', async () => {
      const html = await $fetch('/default')

      expect(html).toMatch(`<h1>Hello</h1>World`)
    })
  })
})
