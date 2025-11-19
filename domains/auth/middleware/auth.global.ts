export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();
    const token = useCookie('token');
    // const {$i18n} = useNuxtApp();
   
    if (to.path === '/auth/login') {
        if (token.value) {
            await store.onGetUser();
            return navigateTo('/');
        }
        return;
    }

    if (to.path === '/auth/register') {
        if (token.value) {
            await store.onGetUser();
            return navigateTo('/');
        }
        return;
    }

    if (token.value) {
        await store.onGetUser();
        // await $i18n.setLocale(store.user.language);
    }else {
        return navigateTo('/auth/login');
    }
});