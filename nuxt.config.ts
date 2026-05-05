// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-27",
  devtools: { enabled: true },
  nitro: {
    logLevel: process.env.NODE_ENV === 'development' ? 1 : 3,
    preset: process.env.VERCEL ? 'vercel' : undefined,
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],

  app: {
    head: {
      title: "HAULED — Moda que Habla",
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        // Favicon HAULED — caja isométrica abierta + cyan accent
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/favicon.svg', color: '#4CC9F0' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap',
        },
      ],
      meta: [
        { name: 'theme-color', content: '#0a1929' },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
          defer: true,
        },
      ],
    }
  },

  runtimeConfig: {
    // Privadas (solo servidor)
    wompiSecretKey: process.env.WOMPI_SECRET_KEY ?? '',
    // Públicas (disponibles en cliente)
    public: {
      wompiPublicKey: process.env.WOMPI_PUBLIC_KEY ?? 'pub_test_XXXXXXXX',
      appUrl: process.env.APP_URL ?? 'https://hauled.shop',
      whatsappNumber: process.env.WHATSAPP_NUMBER ?? '573000000000',
      // Producción: define API_BASE_URL en EasyPanel (ej: https://api.hauled.shop).
      // Si no resuelve, useProducts cae al mock product_data sin romper la tienda.
      // Dev local: hauled-api.test (Herd auto-domain).
      apiBase: process.env.API_BASE_URL ?? (process.env.NODE_ENV === 'production' ? 'https://api.hauled.shop' : 'http://hauled-api.test'),
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },

  css: [
    "~/assets/css/font-awesome-pro.css",
    "~/assets/scss/main.scss",
  ]
})