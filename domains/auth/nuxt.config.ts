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
            'services',
            'repositories',
            'entities',
            'stores',
            'enums',
            'types',
            'server',
        ]
    },
    alias: {
        '@auth': '~/domains/auth'
    }
})