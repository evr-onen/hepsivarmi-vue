import type {AxiosResponse} from "axios";
import type {
    ICommentCreateForm,
    ICommentUpdateForm,
    ICommentDeleteForm,
    ICommentGetFormByProduct,
    ICommentGetForm,
} from "../types/commentTypes";

import useCommentRepository from "../repositories/useCommentRepository";

const useCommentService = () => {

    const {
        getAllByProduct,
        getById,
        reset,
        create,
        update,
        destroy,
    } = useCommentRepository()

    const getAllByProductAction = async (payload: ICommentGetFormByProduct, cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAllByProduct(payload);
        cb?.(response);
    }
    const getByIdAction = async (payload: ICommentGetForm, cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getById(payload);
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: ICommentCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: ICommentUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }
    const deleteAction = async (payload: ICommentDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroy(payload);
        cb(response);
    }

    return {
        getAllByProductAction,
        getByIdAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    }
}

export default useCommentService;