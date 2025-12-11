import type {AxiosResponse} from "axios";
import type {
    IWishlistCreateForm,
    IWishlistUpdateForm,
    IWishlistDeleteForm,
    IWishlistGetFormByUser,
} from "../types/wishlistTypes";

import useWishlistRepository from "../repositories/useWishlistRepository";

const useWishlistService = () => {

    const {
        getAllByUser,
        reset,
        create,
        update,
        destroy,
    } = useWishlistRepository()

    const getAllByUserAction = async (payload: IWishlistGetFormByUser, cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAllByUser(payload);
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: IWishlistCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: IWishlistUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }
    const deleteAction = async (payload: IWishlistDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
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

export default useWishlistService;