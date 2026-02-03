import type { ICartCreateForm, ICartDeleteForm, ICartGetFormByUser, ICartQuantityUpdateForm } from "~/domains/cart/types/cartTypes";
import type {AxiosResponse} from "axios";

const useCartRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "cart"

    if (baseURL) setBaseURL(baseURL);

    const getAllByUser = async (payload: ICartGetFormByUser ): Promise<AxiosResponse>  => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/user/${payload.user_id}`,

        })
    }
    
    const reset = async (): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/reset`,
        })
    }

    const create = async (payload: ICartCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const update = async (payload: ICartQuantityUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const destroy = async (payload: ICartDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/`,
            payload
        })
    }
    
    return {
        getAllByUser,
        reset,
        create,
        update,
        destroy
    }
}
export default useCartRepository;