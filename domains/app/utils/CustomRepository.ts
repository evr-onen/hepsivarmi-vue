import type {AxiosResponse} from "axios";

interface CustomRepositoryMethods {
    customRequest: <T>({queryString, payload}: {queryString?: string, payload?: T}) => Promise<AxiosResponse>;
}

type RequestTypes = 'get' | 'post' | 'put' | 'delete';

const useCustomRepository = (type: RequestTypes, endpoint: string, baseURL?:string, ): CustomRepositoryMethods => {
    const { request, setBaseURL } = useAxios();
    if (baseURL) setBaseURL(baseURL);

    const customRequest = async <T>({queryString, payload}: {queryString?: string, payload?: T}): Promise<AxiosResponse> => {
        return await request({
            type,
            endpoint: `${endpoint}${queryString ? `?${queryString}` : ''}`,
            payload,
        });
    };

    return {
        customRequest,
    };
};

export default useCustomRepository;