import type {
    IPropertyListCreateForm, IPropertyListPropDeleteForm, IPropertyListPropUpdateForm, IPropertyListUpdateForm

} from "~/domains/property/types/propertyListTypes";
import type {AxiosResponse} from "axios";

const usePropertyListRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "property-list"

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

    const create = async (payload: IPropertyListCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const update = async (payload: Partial<IPropertyListUpdateForm>): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}`,
            payload
        })
    }

    const destroy = async (payload: Partial<IPropertyListPropDeleteForm>): Promise<AxiosResponse>  => {
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
export default usePropertyListRepository;