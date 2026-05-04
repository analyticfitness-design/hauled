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
      apiBase: process.env.API_BASE_URL ?? 'http://hauled-api.test',
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