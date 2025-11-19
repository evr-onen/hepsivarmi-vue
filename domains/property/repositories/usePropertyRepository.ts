import type {
    IPropTypeCreateForm, IPropTypeValueCreateForm, IPropTypeValueDeleteForm, IPropTypeValueUpdateForm
} from "~/domains/property/types/propertyTypes";
import type {AxiosResponse} from "axios";

const usePropertyRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "property"

    if (baseURL) setBaseURL(baseURL);

    const getAll = async (): Promise<AxiosResponse>  => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}`,
        })
    }

    const reset = async (): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/reset`,
        })
    }

    const createPropType = async (payload: IPropTypeCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload
        })
    }
    const createPropTypeValue = async (payload: IPropTypeValueCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const updatePropType = async (payload: Partial<IPropTypeValueUpdateForm>): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}`,
            payload
        })
    }
    // const update = async (payload: Partial<IPropTypeValueUpdateForm>): Promise<AxiosResponse>  => {
    //     return await request({
    //         type: 'put',
    //         endpoint: `${endpoint}`,
    //         payload
    //     })
    // }

    const destroyPropType = async (payload: Partial<IPropTypeValueDeleteForm>): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}`,
            payload
        })
    }

    return {
        getAll,
        reset,
        createPropType,
        createPropTypeValue,
        updatePropType,
        destroyPropType,
    }
}
export default usePropertyRepository;