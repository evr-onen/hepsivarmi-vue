import type {
    ICommentCreateForm,
    ICommentUpdateForm,
    ICommentDeleteForm,
    ICommentGetFormByProduct,
    ICommentGetForm,
} from "~/domains/comment/types/commentTypes";
import type {AxiosResponse} from "axios";

const useCommentRepository = () => {
    const { request, setBaseURL } = useAxios();
    const baseURL = 'http://localhost:3000/api/';
    const endpoint = "comment"

    if (baseURL) setBaseURL(baseURL);

    const getAllByProduct = async (payload: ICommentGetFormByProduct ): Promise<AxiosResponse>  => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/product/${payload.product_id}`,

        })
    }
    
     const getById = async (payload: ICommentGetForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'get',
            endpoint: `${endpoint}/${payload.id}`,

        })
    }

    const reset = async (): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/reset`,
        })
    }

    const create = async (payload: ICommentCreateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'post',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const update = async (payload: ICommentUpdateForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'put',
            endpoint: `${endpoint}/`,
            payload
        })
    }

    
    const destroy = async (payload: ICommentDeleteForm): Promise<AxiosResponse>  => {
        return await request({
            type: 'delete',
            endpoint: `${endpoint}/`,
            payload
        })
    }
    
    return {
        getAllByProduct,
        getById,
        reset,
        create,
        update,
        destroy
    }
}
export default useCommentRepository;