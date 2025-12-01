import { object, string } from 'yup';
import type {
    IBrandCreateForm,
    IBrandUpdateForm,
    IBrandDeleteForm
} from "../types/brandTypes";

const useBrandFormValidation = () => {
    const createBrandFormSchema = object({
        name: string().required('Name is required'),
    })
    const updateBrandFormSchema = object({
        name: string().required('Name is required'),
    })
    const deleteBrandFormSchema = object({
        id: string().required('Brand ID is required'),
    })


    const createBrandValidation = (form:IBrandCreateForm) => {
        return FormValidator<IBrandCreateForm>(createBrandFormSchema, form);
    }
    const updateBrandValidation = (form:IBrandUpdateForm) => {
        return FormValidator<IBrandUpdateForm>(updateBrandFormSchema, form);
    }
    const deleteBrandValidation = (payload:IBrandDeleteForm) => {
        return FormValidator<IBrandDeleteForm>(deleteBrandFormSchema, payload);
    }


    return {
        createBrandValidation,
        updateBrandValidation,
        deleteBrandValidation,
    }
}



export default useBrandFormValidation;