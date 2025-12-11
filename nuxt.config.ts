// https://nuxt.com/docs/api/configuration/nuxt-config
// import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  extends: [
    './domains/category',
    './domains/auth',
    './domains/admin',
    './domains/app',
    './domains/home',
    './domains/account',
    './domains/order',
    './domains/variant',
    './domains/product',
    './domains/settings',
    './domains/property',
    './domains/image',
    './domains/brand',
    './domains/comment',
    './domains/wishlist',
    './domains/compare',
],

  css: [
      '~/domains/app/assets/theme/_variables.css',
      '~/domains/app/assets/main.css',
  ],
 
  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt', '@vueuse/nuxt', '@nuxt/icon', '@primevue/nuxt-module' ],



  icon: {
    size: '24px',
    class: 'icon',
    aliases: {}
  },

  imports: {
    dirs: [
      'domains/app/utils'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  router: {
    options: {
      strict: false
    }
  },

})