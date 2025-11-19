export default defineNuxtConfig({
    components: [
        {
            path: '~/domains/app',
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
            'entities',
            // 'stores',
            // 'enums',
            'types',
            'utils',
            'directives'
        ]
    },

    css: [
        '~/domains/app/assets/fonts/tangerine/index.css'
      ],
    alias: {
        '@app': '~/domains/app'
    }
})