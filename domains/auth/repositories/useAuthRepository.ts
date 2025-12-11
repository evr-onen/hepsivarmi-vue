import type {AxiosResponse} from "axios";

const useAuthRepository = () => {
    // const apiBaseURLFake = useRuntimeConfig().public.apiBaseURLFake as string;
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "auth"

    if (baseURL) setBaseURL(baseURL);

    const login = async (payload: IUserLoginForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/login`,
            payload
        })
    }

    const register = async (payload: IUserRegisterForm): Promise<AxiosResponse>  => {
       return await request({
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

    const user = async (token ?:string):Promise<AxiosResponse> => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/me`,
            payload: { token }
        })
    }


    return {
        login,
        register,
        logout,
        user
    }
}
export default useAuthRepository;