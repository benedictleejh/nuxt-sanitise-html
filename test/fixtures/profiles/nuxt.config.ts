import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],

  sanitiseHtml: {
    profiles: {
      onlyH1: {
        config: {
          allowedTags: [
            'h1'
          ]
        }
      },

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
