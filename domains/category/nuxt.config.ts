export default defineNuxtConfig({
    components: [
        {
            path: '~/domains/category',
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