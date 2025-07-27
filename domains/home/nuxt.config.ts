export default defineNuxtConfig({
    components: [
        {
            path: '~/domains/home',
            pathPrefix: false,
            pattern: '**/components/**/*.vue',
            global: true
        }
    ],
    extends: [
    ],
    
    imports:{
        dirs: [
            // 'composables',
            // 'services',
            // 'repositories',
            // 'entities',
            // 'stores',
            // 'enums',
            // 'utils'
        ]
    }
})