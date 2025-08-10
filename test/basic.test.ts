import { fileURLToPath } from 'node:url'

import { setup, $fetch } from '@nuxt/test-utils/e2e'
import { describe, it, expect } from 'vitest'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url))
  })

  it('should sanitise the HTML', async () => {
    // Get response to a server-rendered page with `$fetch`.
    const html = await $fetch('/')

    expect(html).toMatch(`<div><p>Hello World</p><a href="/">a link</a></div>`)
    expect(html).not.toMatch(`<script>alert('This is an XSS attack!')</` + `script>`)
  })
})
