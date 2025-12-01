import type {
    IBrandCreateForm,
    IBrandUpdateForm,
    IBrandDeleteForm
} from "~/domains/brand/types/brandTypes";
import type {AxiosResponse} from "axios";

const useBrandRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "brand"

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
        const formData = new FormData()
        formData.append('name', payload.name)
        payload.logo?.forEach((file, index) => {
            if (file) {
                formData.append('logo', file, file.name ?? `logo-${index}`)
            }
        })

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
    const update = async (payload: IBrandUpdateForm): Promise<AxiosResponse>  => {
        const formData = new FormData()
        formData.append('id', payload.id)
        formData.append('name', payload.name)
        payload.logo?.forEach((file, index) => {
            if (file) {
                formData.append('logo', file, file.name ?? `logo-${index}`)
            }
        })

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
    const destroy = async (payload: IBrandDeleteForm): Promise<AxiosResponse>  => {
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
export default useBrandRepository;