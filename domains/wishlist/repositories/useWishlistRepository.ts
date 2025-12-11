import type {
    IWishlistCreateForm,
    IWishlistUpdateForm,
    IWishlistDeleteForm,
    IWishlistGetFormByUser,
} from "~/domains/wishlist/types/wishlistTypes";
import type {AxiosResponse} from "axios";

const useWishlistRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "wishlist"

    if (baseURL) setBaseURL(baseURL);

    const getAllByUser = async (payload: IWishlistGetFormByUser ): Promise<AxiosResponse>  => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/${payload.user_id}`,

        })
    }
    
    const reset = async (): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/reset`,
        })
    }

    const create = async (payload: IWishlistCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const update = async (payload: IWishlistUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const destroy = async (payload: IWishlistDeleteForm): Promise<AxiosResponse>  => {
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
export default useWishlistRepository;