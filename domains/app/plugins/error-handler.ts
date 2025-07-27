export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
        console.log('Nuxt Error:', error);
    }

    // App error
    nuxtApp.hook('app:error', (error) => {
        console.log('App Error:', error);

    });
  
    // Client error
    nuxtApp.hook('vue:error', (error, instance, info) => {
      console.log('Client Error:', error);

    })

})