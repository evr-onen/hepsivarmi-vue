import type { IUserRegisterForm } from "../types/accountTypes";
import useAuthService from "../services/useAuthService";
import  useUserFormValidation from "../validations/useUserFormValidation";
import {
    userEntity,
    createAuthUserLoginFormErrorsEntity,
    createAuthUserRegistrationFormEntity
} from "~/domains/auth/entities/AuthEntity";

const useAuthStore = defineStore('AuthStore', () => {
    const router = useRouter();
    const { userLoginValidation, userRegisterValidation} = useUserFormValidation();
    const { loginAction, getUserAction, logoutAction, registerAction } = useAuthService();

    // STATES
    const isLogoutPending = ref<boolean>(false);
    const isGetUserPending = ref<boolean>(false);

    const token = useCookie('token');
    const user = ref(userEntity({}));

    // Register Form States
    const userRegisterForm = ref<IUserRegisterForm>(createAuthUserRegistrationFormEntity({}));
    const userLoginForm = ref<IUserLoginForm>({
        email: 'admin@admin.com',
        password: 'password',
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
    const clearUserData = () => user.value = userEntity({})
    const clearAll = async () => {
        await clearToken();
        clearUserData();
        return await router.push('/auth/login');
    }


    // FORM HANDLERS

    const onRegister = async () => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                    await registerAction(toRaw(userRegisterForm.value),(response) => {
                        if(response.data.success){
                        userLoginForm.value = {email:userRegisterForm.value.email , password:userRegisterForm.value.password}
                        }

                        onLogin()
                    });
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
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await loginAction(toRaw(userLoginForm.value), async (response) => {
                    tokenSet(response.data.data.token);
                    console.log(response.data);
                    if(response.data.success) {
                        console.log(response.data.data.user);
                        user.value = userEntity(response.data.data.user);
                        await nextTick(()=>navigateTo('/'));

                    }else{
                        console.log(response.data.data.messages);
                        userLoginFormErrors.value = response.data.data.messages
                        console.log(userLoginFormErrors.value);
                    }
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

            if(token.value){
                await getUserAction(token.value!, (response)=>{
                    if(response.data.success && response.data.data?.user) {
                        user.value = userEntity(response.data.data.user);
                    } else {
                        // Token invalid or user not found
                        clearAll();
                    }
                });
            }else{
                user.value = userEntity({});

            }
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
        onLogin,
        onRegister,
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