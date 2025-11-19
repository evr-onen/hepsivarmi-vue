import type {AxiosResponse} from "axios";
import type {
    IVariantTypeCreateForm,
    IVariantValueCreateForm,
    IVariantTypeUpdateForm,
    IVariantValueUpdateForm,
    IVariantTypeDeleteForm,
    IVariantValueDeleteForm,
} from "../types/variantTypes";
import useVariantRepository from "../repositories/useVariantRepository";

const useVariantService = () => {

    const {
        getAll,
        reset,
        createValue,
        createType,
        updateValue,
        updateType,
        destroyValue,
        destroyType
    } = useVariantRepository()

    const variantGetAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const variantResetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const variantTypeCreateAction = async (payload: IVariantTypeCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createType(payload);
        cb(response);
    }
    const variantValueCreateAction = async (payload: IVariantValueCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createValue(payload);
        cb(response);
    }
    const variantUpdateAction = async (payload: IVariantTypeUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await updateType(payload);
        cb(response);
    }
    const variantValueUpdateAction = async (payload: IVariantValueUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await updateValue(payload);
        cb(response);
    }
    const variantTypeDeleteAction = async (payload: IVariantTypeDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroyType(payload);
        cb(response);
    }
    const variantValueDeleteAction = async (payload: IVariantValueDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroyValue(payload);
        cb(response);
    }
    return {
        variantGetAllAction,
        variantResetAction,
        variantTypeCreateAction,
        variantValueCreateAction,
        variantUpdateAction,
        variantValueUpdateAction,
        variantTypeDeleteAction,
        variantValueDeleteAction,
    }
}

export default useVariantService;