// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

svgLoader({
  defaultImport: 'raw'
})

//TODO добавить линтер

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s | soundOST',
    }
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
        ],
      },
    ],
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/scss/main.scss";'
        },
      },
    },
    plugins: [svgLoader()]
  },
})
