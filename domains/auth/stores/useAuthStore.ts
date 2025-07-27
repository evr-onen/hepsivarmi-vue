import {AxiosError} from "axios";
import type { IUser, IUserRegisterForm } from "../types/accountTypes";
import useAuthService from "../services/useAuthService";
import  useUserFormValidation from "../validations/useUserFormValidation";

const useAuthStore = defineStore('AuthStore', () => {
    const router = useRouter();
    const {userRegisterValidation, userLoginValidation} = useUserFormValidation();
    // const {$i18n} = useNuxtApp();
    const { registerAction, loginAction, getUserAction, logoutAction } = useAuthService();


    // STATES
    const isLogoutPending = ref<boolean>(false);
    const isGetUserPending = ref<boolean>(false);

    const token = useCookie('token');
    const user = ref<IUser>(createAuthUserEntity({}));

    // Register Form States
    const userRegisterForm = ref<IUserRegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const userLoginForm = ref<IUserLoginForm>({
        email: '',
        password: '',
    });
    const userRegisterFormErrors = ref<TErrorBag>(createAuthUserRegistrationFormErrorsEntity());
    const userLoginFormErrors = ref<TErrorBag>(createAuthUserLoginFormErrorsEntity());
    const userRegisterFormInlineAlert = ref<IInlineMessage>(createInlineAlert());
    const userLoginFormInlineAlert = ref<IInlineMessage>(createInlineAlert());
    const isRegisterActionLoading = ref<boolean>(false);
    const isLoginActionLoading = ref<boolean>(false);

    // Auth Alert States
    const authAlertInline = ref<IInlineMessage>({
        type: '',
        title: '',
        message: '',
        closable: true,
        status: false,
    });

    // ACTIONS
    const tokenSet = (value:string | null) => {
        token.value = value;
        refreshCookie('token');
        
    }


    // CLEAR FUNCTIONS
    const clearToken = async () => tokenSet(null);
    const clearUserData = () => user.value = createAuthUserEntity({})
    const clearAll = async () => {
        await clearToken();
        clearUserData();
        return await router.push('/auth/login');
    }


    // FORM HANDLERS

    const onRegister = async () => {
        console.log('register');
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                    await registerAction(toRaw(userRegisterForm.value));
                },
            userRegisterFormErrors,
            userRegisterFormInlineAlert,
            () => userRegisterValidation(toRaw(userRegisterForm.value))
            );
        },
        isRegisterActionLoading,
        userRegisterFormErrors,
        userRegisterFormInlineAlert
        )

    }

    const onLogin = async () => {
        console.log('login');
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await loginAction(toRaw(userLoginForm.value), (response) => {
                    tokenSet(response.data.data.token);
                    user.value = createAuthUserEntity(response.data.data.user);
                    return nextTick(() => navigateTo('/'));
                })
                
                },
            userLoginFormErrors,
            userLoginFormInlineAlert,
            () => userLoginValidation(toRaw(userLoginForm.value))
            );
        },
        isLoginActionLoading,
        userLoginFormErrors,
        userLoginFormInlineAlert
        )
    } 

    watch(userLoginFormErrors, (newVal) => {
        console.log(newVal);
    })

    const onGetUser = async () => {
        try {
            isGetUserPending.value = true;
            user.value = await getUserAction();
        } catch (error: unknown) {
            console.log(error);
            await clearAll();
            await nextTick(() => navigateTo('/'))
            return Promise.reject(error);
        }finally {
            isGetUserPending.value = false;
        }
    }

    
    const onLogout = async () => {
        try {
            isLogoutPending.value = true;
            await logoutAction();
            return nextTick(() => navigateTo('/'));
        } catch (error: unknown) {
            return Promise.reject(error);
        }finally {
            await clearAll();
            isLogoutPending.value = false;
        }
    }

    const userEmail = computed(() => user.value.email);
    const userName = computed(() => user.value.name);
    const isLoggedIn = computed(() => !!token.value);

    return {
        isLoginActionLoading,
        isRegisterActionLoading,
        isGetUserPending,
        userRegisterForm,
        userRegisterFormErrors,
        userLoginForm,
        userLoginFormErrors,
        authAlertInline,
        onRegister,
        onLogin,
        onGetUser,
        onLogout,
        clearAll,
        
        user,
        userEmail,
        userName,
        isLoggedIn,
        token,
    }
})

export default useAuthStore;