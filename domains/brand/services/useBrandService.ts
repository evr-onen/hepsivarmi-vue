import type {AxiosResponse} from "axios";
import type {
    IBrandCreateForm,
    IBrandUpdateForm,
    IBrandDeleteForm,
} from "../types/brandTypes";
import useBrandRepository from "../repositories/useBrandRepository";

const useBrandService = () => {

    const {
        getAll,
        reset,
        create,
        update,
        destroy,
    } = useBrandRepository()

    const getAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: IBrandCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: IBrandUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }
    const deleteAction = async (payload: IBrandDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
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

export default useBrandService;