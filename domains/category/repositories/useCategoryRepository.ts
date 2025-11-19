import type {
    IMainCategoryCreateForm,
    ISubCategoryCreateForm,
    IMainCategoryUpdateForm,
    ISubCategoryUpdateForm,
    IMainCategoryDeleteForm,
    ISubCategoryDeleteForm,
} from "~/domains/category/types/categoryTypes";
import type {AxiosResponse} from "axios";

const useCategoryRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "category"

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

    const createMain = async (payload: IMainCategoryCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/main`,
            payload
        })
    }

    const createSub = async (payload: ISubCategoryCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const updateMain = async (payload: IMainCategoryUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/main`,
            payload
        })
    }

    const updateSub = async (payload: ISubCategoryUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const destroyMain = async (payload: IMainCategoryDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/main`,
            payload
        })
    }
    const destroySub = async (payload: ISubCategoryDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}`,
            payload
        })
    }

    return {
        getAll,
        reset,
        createMain,
        createSub,
        updateMain,
        updateSub,
        destroyMain,
        destroySub
    }
}
export default useCategoryRepository;