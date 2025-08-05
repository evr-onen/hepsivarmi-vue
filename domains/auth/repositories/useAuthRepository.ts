const useAuthRepository = () => {
    // const apiBaseURLFake = useRuntimeConfig().public.apiBaseURLFake as string;
    const { request, setBaseURL } = useAxios();
    // const baseURL = 'http://127.0.0.1:8000/api/';
    const baseURL = 'http://hepsivarmi-api.test/api/';
    const endpoint = "auth"

    if (baseURL) setBaseURL(baseURL);

    const login = async (payload: IUserLoginForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/login`,
            payload
        })
    }

    const register = async (payload: IUserRegisterForm): Promise<void>  => {
        await request({
            type: 'post',
            endpoint: `${endpoint}/register`,
            payload
        })
    }

   
    const logout = async ():Promise<void> => {
        await request({
            type: 'post',
            endpoint: `${endpoint}/logout`,
        })
    }

    const user = async ():Promise<IUser> => {
        const {data} = await request({
            type: 'get',
            endpoint: `${endpoint}/me`,
        })
        return createAuthUserEntity(data.data);
    }


    return {
        login,
        register,
        logout,
        user
    }
}
export default useAuthRepository;