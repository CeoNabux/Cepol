export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: false,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Centro Politecnico',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Somos la academia que te prepara para tu futuro profesional',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/images/favicon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['quill/dist/quill.snow.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/clickaway.js',
    '~/plugins/timer.js',
    '~/plugins/firebase/app.js',
    '~/plugins/map.js',
    '~/plugins/google-maps.js',
    '~/plugins/chart.js',
    '~/plugins/vee-validate.js',
    '~/plugins/vue-editor.js',
    '~/plugins/katex.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  publicRunTimeConfig: {
    SERVICE: process.env.NUXT_ENV_SERVICE,
    TEMPLATE: process.env.NUXT_ENV_TEMPLATE,
    USERID: process.env.NUXT_ENV_USERID,

    APIKEY: process.env.NUXT_ENV_APIKEY,
    AUTHDOMAIN: process.env.NUXT_ENV_AUTHDOMAIN,
    PROJECTID: process.env.NUXT_ENV_PROJECTID,
    STORAGEBUCKET: process.env.NUXT_ENV_STORAGEBUCKET,
    MESSAGINGSENDER: process.env.NUXT_ENV_MESSAGINGSENDER,
    APPID: process.env.NUXT_ENV_APPID,
    MEASURESID: process.env.NUXT_ENV_APPID,

    MAPS: process.env.NUXT_ENV_MAPS,
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      Lato: [100, 300, 400, 700, 900],
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue2-editor/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  router: {
    middleware: 'router-auth',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
    transpile: ['vee-validate'],
  },
  env: {
    GOOGLE_MAPS: process.env.NUXT_ENV_MAPS,
  },
}
