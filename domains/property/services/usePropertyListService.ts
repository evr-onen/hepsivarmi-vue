import type {AxiosResponse} from "axios";
import type {
    IPropertyListCreateForm,
    IPropertyListPropDeleteForm,
    IPropertyListPropUpdateForm, IPropertyListUpdateForm
} from "../types/propertyListTypes";
import UsePropertyListRepository from "../repositories/usePropertyListRepository";

const usePropertyListService = () => {

    const {
        getAll,
        reset,
        create,
        update,
        destroy,
    } = UsePropertyListRepository()

    const getAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const createAction = async (payload: IPropertyListCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await create(payload);
        cb(response);
    }
    const updateAction = async (payload: IPropertyListUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await update(payload);
        cb(response);
    }

    const deleteAction = async (payload: Partial<IPropertyListPropDeleteForm>, cb: (response: AxiosResponse) => void): Promise<void> => {
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

export default usePropertyListService;