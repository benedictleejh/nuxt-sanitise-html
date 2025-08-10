// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/test-utils'
  ],

  typescript: {
    tsConfig: {
      compilerOptions: {
        exactOptionalPropertyTypes: true
      }
    }
  }
})
