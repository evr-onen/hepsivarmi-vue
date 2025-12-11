export default defineNuxtRouteMiddleware(async (to) => {
    const store = useAuthStore();
    const token = useCookie('token');
    // const {$i18n} = useNuxtApp();
   
    // Redirect to home if already logged in and trying to access auth pages
    if (to.path === '/auth/login' || to.path === '/auth/register') {
        if (token.value) {
            // Only fetch user if not already loaded
            if (!store.user?.email) {
                await store.onGetUser();
            }
            return navigateTo('/');
        }
        return;
    }

    // Admin pages require authentication
    if (to.path.startsWith('/admin')) {
        if (token.value) {
            // Only fetch user if not already loaded
            if (!store.user?.email) {
                await store.onGetUser();
            }
        } else {
            return navigateTo('/auth/login');
        }
        return;
    }

    // For other pages, only fetch user if token exists but user data is not loaded
    if (token.value && !store.user?.email) {
        await store.onGetUser();
    }
});