import type {
    IVariantTypeCreateForm,
    IVariantValueCreateForm,
    IVariantTypeUpdateForm,
    IVariantValueUpdateForm,
    IVariantTypeDeleteForm,
    IVariantValueDeleteForm,
} from "~/domains/variant/types/variantTypes";
import type {AxiosResponse} from "axios";

const useVariantRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "variant"

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

    const createType = async (payload: IVariantTypeCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/type`,
            payload
        })
    }

    const createValue = async (payload: IVariantValueCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const updateType = async (payload: IVariantTypeUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/type`,
            payload
        })
    }

    const updateValue = async (payload: IVariantValueUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const destroyType = async (payload: IVariantTypeDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/type`,
            payload
        })
    }
    const destroyValue = async (payload: IVariantValueDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}`,
            payload
        })
    }

    return {
        getAll,
        reset,
        createValue,
        createType,
        updateValue,
        updateType,
        destroyValue,
        destroyType
    }
}
export default useVariantRepository;