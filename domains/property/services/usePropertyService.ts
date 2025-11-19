import type {AxiosResponse} from "axios";
import type {
    IPropTypeCreateForm,
    IPropTypeValueCreateForm,
    IPropTypeValueDeleteForm,
    IPropTypeValueUpdateForm
} from "../types/propertyTypes";
import usePropertyRepository from "../repositories/usePropertyRepository";

const usePropertyService = () => {

    const {
        getAll,
        reset,
        createPropType,
        createPropTypeValue,
        updatePropType,
        destroyPropType,
    } = usePropertyRepository()

    const getAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const resetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }

    const createPropertyTypeAction = async (payload: IPropTypeCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createPropType(payload);
        cb(response);
    }

    const createPropertyValueAction = async (payload: IPropTypeValueCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createPropTypeValue(payload);
        cb(response);
    }

    const updatePropertyTypeAction = async (payload: Partial<IPropTypeValueUpdateForm>, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await updatePropType(payload);
        cb(response);
    }

    const deletePropertyTypeAction = async (payload: Partial<IPropTypeValueDeleteForm>, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroyPropType(payload);
        cb(response);
    }

    const deletePropertyValueAction = async (payload: Partial<IPropTypeValueDeleteForm>, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroyPropType(payload);
        cb(response);
    }
    return {
        getAllAction,
        resetAction,
        createPropertyTypeAction,
        createPropertyValueAction,
        updatePropertyTypeAction,
        deletePropertyTypeAction,
        deletePropertyValueAction,
    }
}

export default usePropertyService;