import type {
    IBrandCreateForm,
    IBrandUpdateForm,
    IBrandDeleteForm
} from "~/domains/brand/types/brandTypes";
import type {AxiosResponse} from "axios";

const useBrandRepository = () => {
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
    const create = async (payload: IBrandCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/type`,
            payload
        })
    }
    const update = async (payload: IBrandUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/type`,
            payload
        })
    }
    const destroy = async (payload: IBrandDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/type`,
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
export default useBrandRepository;