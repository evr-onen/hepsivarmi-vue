import type {AxiosResponse} from "axios";
import type {
    IProductCreateForm,
    IProductUpdateForm,
    IProductDeleteForm,
} from "../types/productTypes";
import useProductRepository from "../repositories/useProductRepository";

const useProductService = () => {

    const {
        getAll,
        reset,
        create,
        update,
        destroy,
    } = useProductRepository()

    const getAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: IProductCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: IProductUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }
    const deleteAction = async (payload: IProductDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroy(payload);
        cb(response);
    }

    return {
        getAllAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    }
}

export default useProductService;