import type {AxiosResponse} from "axios";
import type {
    IMainCategoryCreateForm,
    ISubCategoryCreateForm,
    IMainCategoryUpdateForm,
    ISubCategoryUpdateForm,
    IMainCategoryDeleteForm,
    ISubCategoryDeleteForm,
} from "../types/categoryTypes";
import useCategoryRepository from "../repositories/useCategoryRepository";

const useCategoryService = () => {

    const {
        getAll,
        reset,
        createMain,
        createSub,
        updateMain,
        updateSub,
        destroyMain,
        destroySub,
    } = useCategoryRepository()

    const categoryGetAllAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await getAll();
        cb?.(response);
    }
    const categoryResetAction = async ( cb?: (response: AxiosResponse) => void): Promise<void> => {
        const response = await reset();
        cb?.(response);
    }
    const categoryMainCreateAction = async (payload: IMainCategoryCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createMain(payload);
        cb(response);
    }
    const categorySubCreateAction = async (payload: ISubCategoryCreateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await createSub(payload);
        cb(response);
    }
    const categoryMainUpdateAction = async (payload: IMainCategoryUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await updateMain(payload);
        cb(response);
    }
    const categorySubUpdateAction = async (payload: ISubCategoryUpdateForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await updateSub(payload);
        cb(response);
    }
    const categoryMainDeleteAction = async (payload: IMainCategoryDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroyMain(payload);
        cb(response);
    }
    const categorySubDeleteAction = async (payload: ISubCategoryDeleteForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await destroySub(payload);
        cb(response);
    }
    return {
        categoryGetAllAction,
        categoryResetAction,
        categoryMainCreateAction,
        categorySubCreateAction,
        categoryMainUpdateAction,
        categorySubUpdateAction,
        categoryMainDeleteAction,
        categorySubDeleteAction,
    }
}

export default useCategoryService;