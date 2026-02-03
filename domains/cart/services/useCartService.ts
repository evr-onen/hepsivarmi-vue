import type {AxiosResponse} from "axios";
import type {
    ICartGetFormByUser,
    ICartCreateForm,
    ICartQuantityUpdateForm,
    ICartDeleteForm,
} from "../types/cartTypes";

import useCartRepository from "../repositories/useCartRepository";

const useCartService = () => {

    const {
        getAllByUser,
        reset,
        create,
        update,
        destroy,
    } = useCartRepository()

    const getAllByUserAction = async (payload: ICartGetFormByUser, cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAllByUser(payload);
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: ICartCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: ICartQuantityUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }
    const deleteAction = async (payload: ICartDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroy(payload);
        cb(response);
    }

    return {
        getAllByUserAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    }
}

export default useCartService;