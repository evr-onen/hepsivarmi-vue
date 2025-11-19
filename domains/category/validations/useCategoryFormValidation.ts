import { object, string } from 'yup';
import type {
    IMainCategoryCreateForm,
    ISubCategoryCreateForm,
    IMainCategoryUpdateForm,
    ISubCategoryUpdateForm,
    IMainCategoryDeleteForm,
    ISubCategoryDeleteForm,
} from "../types/categoryTypes";

// schemas
const useCategoryFormValidation = () => {
    const mainCategoryCreateFormSchema = object({
        name: string().required('Category Name is required'),
    })

    const subCategoryCreateFormSchema = object({
        main_id : string().required('Type ID is required'),
        name    : string().required('Category Name is required'),
    })

    const updateMainCategoryFormSchema = object({
        name: string().required('Name ID is required'),
    })
    const updateSubCategoryFormSchema = object({
        main_id: string().required('Variant Type is required'),
        name: string().required('Name ID is required'),
    })
    const deleteMainCategoryFormSchema = object({
        main_id: string().required('Variant Type is required'),
    })
    const deleteSubCategoryFormSchema = object({
        main_id: string().required('Variant Type is required'),
        sub_id: string().required('Name ID is required'),
    })

    const mainCategoryCreateValidation = (form:IMainCategoryCreateForm) => {
        return FormValidator<IMainCategoryCreateForm>(mainCategoryCreateFormSchema, form);
    }

    const subCategoryCreateValidation = (form:ISubCategoryCreateForm) => {
        return FormValidator<ISubCategoryCreateForm>(subCategoryCreateFormSchema, form);
    }

    const mainCategoryUpdateValidation = (form:IMainCategoryUpdateForm) => {
        return FormValidator<IMainCategoryUpdateForm>(updateMainCategoryFormSchema, form);
    }

    const subCategoryUpdateValidation = (form:ISubCategoryUpdateForm) => {
        return FormValidator<ISubCategoryUpdateForm>(updateSubCategoryFormSchema, form);
    }

    const mainCategoryDeleteValidation = (payload:IMainCategoryDeleteForm) => {
        return FormValidator<IMainCategoryDeleteForm>(deleteMainCategoryFormSchema, payload);
    }
    const subCategoryDeleteValidation = (payload:ISubCategoryDeleteForm) => {
        return FormValidator<ISubCategoryDeleteForm>(deleteSubCategoryFormSchema, payload);
    }


    return {
        mainCategoryCreateValidation,
        subCategoryCreateValidation,
        mainCategoryUpdateValidation,
        subCategoryUpdateValidation,
        mainCategoryDeleteValidation,
        subCategoryDeleteValidation,
    }
}



export default useCategoryFormValidation;