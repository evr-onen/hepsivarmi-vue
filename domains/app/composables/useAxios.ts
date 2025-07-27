import axios, {type AxiosRequestConfig, type Method} from "axios";

interface RequestCredentials<TPayload = unknown> {
    type: Method;
    endpoint: string;
    payload?: TPayload;
    options?: AxiosRequestConfig;
}

const useAxios = () => {
    const config = useRuntimeConfig();
    const {apiBaseURL} = config.public;
    const store = useAuthStore();
    const axiosInstance = axios.create({
        baseURL: apiBaseURL as string,
        withCredentials : true,
        withXSRFToken: true,
        headers: {
            "Content-Type" : "application/json",
            Accept : "application/json",
        },
    });

    axiosInstance.interceptors.request.use((config) => {
        if (store.token)
            config.headers.Authorization = `Bearer ${store.token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(response => {
        return response;
    }, async (error) => {
        if (error.response?.status === 401) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
                message: "Session expired",
                fatal:true,
            });
        }else if (error.response?.status === 403) {
            throw createError({
                statusCode: 403,
                statusMessage: "Forbidden",
                message: error.message,
            })
        }
        return Promise.reject(error);
    })

    const request = (credentials:RequestCredentials) => {
        const {type, endpoint, payload, options = {}} = credentials;

        return axiosInstance({
            method: type,
            url: `/${endpoint}`,
            data: payload,
            ...options
        })
    }

    const setBaseURL = (baseURL:string) => {
        axiosInstance.defaults.baseURL = baseURL;
    }

    return {
        request,
        setBaseURL
    }
}

export default useAxios;