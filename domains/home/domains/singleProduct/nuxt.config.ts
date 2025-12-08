export default defineNuxtConfig({
    // components: [
    //     {
    //         path: '~/domains/home/domains/products',
    //         pathPrefix: false,
    //         pattern: '**/components/**/*.vue',
    //         global: true
    //     }
    // ],
    extends: [
        './domains/singleProduct'
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