import type {AxiosResponse} from "axios";

interface BaseRepositoryMethods {
    index: (queryString?: string) => Promise<AxiosResponse>;
    show: (uuid: string) => Promise<AxiosResponse>;
    edit: (uuid: string) => Promise<AxiosResponse>;
    store: <T>(payload: T) => Promise<AxiosResponse>;
    update: <T>(uuid: string, payload: T) => Promise<AxiosResponse>;
    destroy: (uuid: string) => Promise<AxiosResponse>;
}

const useBaseRepository = (endpoint: string, baseURL?:string): BaseRepositoryMethods => {
    const { request, setBaseURL } = useAxios();
    if (baseURL) setBaseURL(baseURL);

    const index = async (queryString?: string): Promise<AxiosResponse> => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}${queryString ? `?${queryString}` : ''}`,
        });
    };

    const show = async (uuid: string): Promise<AxiosResponse> => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/${uuid}`,
        });
    };

    const edit = async (uuid: string): Promise<AxiosResponse> => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/${uuid}/edit`,
        });
    };

    const store = async <T>(payload: T): Promise<AxiosResponse> => {
        return await request({
            type: 'post',
            endpoint,
            payload,
        });
    };
    

    const update = async <T>(uuid: string, payload: T): Promise<AxiosResponse> => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/${uuid}`,
            payload,
        });
    };

    const destroy = async (uuid: string): Promise<AxiosResponse> => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/${uuid}`,
        });
    };

    return {
        index,
        show,
        edit,
        store,
        update,
        destroy,
    };
};

export default useBaseRepository;