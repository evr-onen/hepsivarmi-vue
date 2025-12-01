import type {
    IProductCreateForm,
    IProductUpdateForm,
    IProductDeleteForm,
} from "~/domains/product/types/productTypes";
import type {AxiosResponse} from "axios";
import buildFormData from "~/domains/app/utils/buildFormData";

const useProductRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "product"

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
    const create = async (payload: IProductCreateForm): Promise<AxiosResponse>  => {
        const formData = buildFormData(payload)

        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload: formData,
            options: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
    }
    const update = async (payload: IProductUpdateForm): Promise<AxiosResponse>  => {
        const formData = buildFormData(payload)

        return await request({
            type: 'put',
            endpoint: `${endpoint}`,
            payload: formData,
            options: {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        })
    }

    const destroy = async (payload: IProductDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}`,
            payload
        })
    }

    return {
        getAll,
        reset,
        create,
        update,
        destroy,
    }
}
export default useProductRepository;