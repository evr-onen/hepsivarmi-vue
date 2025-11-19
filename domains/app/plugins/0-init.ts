import { defineNuxtPlugin } from '#app'
import vClickOutside from '@/domains/app/directives/clickOutside'

export default defineNuxtPlugin(async(nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', vClickOutside)
})
