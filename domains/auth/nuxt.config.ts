export default defineNuxtConfig({
    components: [
        {
            path: '~/domains/auth',
            pathPrefix: false,
            pattern: '**/components/**/*.vue',
            global: true
        }
    ],
    imports:{
        dirs: [
            'composables',
            'services',
            'repositories',
            'entities',
            'stores',
            'enums',
            'types',
        ]
    }
})