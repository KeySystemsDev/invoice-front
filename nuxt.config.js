module.exports = {
  mode: 'spa',
  router: {
    middleware: 'auth'
  },
  env: {

  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Fatura Facilita',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
    ],
    //Implementación chatlio
    script: [
      // { src: 'https://apis.google.com/js/api:client.js' }
      // { src: 'https://s3-us-west-2.amazonaws.com/pharol-v2/js/chatlio.js' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  modules: [
   ['@nuxtjs/google-tag-manager', { id: 'GTM-WKHPV9R' }],

  ],
  plugins: [
    '~plugins/vuetify',
    '~plugins/autocomplete',
    '~plugins/vue-instantsearch',
    '~plugins/vue-notifyjs',
    '~plugins/socket-io',
    '~plugins/loginFacebook',
    '~plugins/loginGoogle',
    { src: '~/plugins/localStorage.js', ssr: false },
  ],
  css: [
    '~assets/app.styl',
    '~assets/main.css',
    '~node_modules/vue-notifyjs/themes/default.css',
  ],
  loading: {
    color: '#FF581E',
    duration: 5000,
    height: '5px',
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vuetify']
    /*
    ** Run ESLint on save
    */
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
