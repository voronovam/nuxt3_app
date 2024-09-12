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
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'mask-icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-touch-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-touch-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-touch-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-touch-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-touch-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-touch-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-touch-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon-180x180.png' },
      ]
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
