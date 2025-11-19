export default defineNuxtConfig({
    components: [
        {
            path: '~/domains/property',
            pathPrefix: false,
            pattern: '**/components/**/*.vue',
            global: true
        }
    ],
    imports:{
        dirs: [
            // 'composables',
            // 'services',
            // 'repositories',
            // 'entities',
            'stores',
            // 'enums',
            // 'utils'
        ]
    }
})