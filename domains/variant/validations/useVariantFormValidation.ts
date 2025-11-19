import { object, string } from 'yup';
import type {
    IVariantTypeCreateForm,
    IVariantValueCreateForm,
    IVariantTypeUpdateForm,
    IVariantValueUpdateForm,
    IVariantValueDeleteForm, IVariantTypeDeleteForm,
} from "../types/variantTypes";

const useVariantFormValidation = () => {
    const variantTypeCreateFormSchema = object({
        name: string().required('Name is required'),
    })

    const variantValueCreateFormSchema = object({
        type_id : string().required('Type ID is required'),
        name    : string().required('Name is required'),
    })

    const updateVariantFormSchema = object({
        name: string().required('Name ID is required'),
    })
    const updateVariantValueFormSchema = object({
        type_id: string().required('Variant Type is required'),
        name: string().required('Name ID is required'),
    })
    const deleteVariantTypeFormSchema = object({
        type_id: string().required('Variant Type is required'),
    })
    const deleteVariantValueFormSchema = object({
        type_id: string().required('Variant Type is required'),
        value_id: string().required('Name ID is required'),
    })

    const variantTypeCreateValidation = (form:IVariantTypeCreateForm) => {
        return FormValidator<IVariantTypeCreateForm>(variantTypeCreateFormSchema, form);
    }

    const variantValueCreateValidation = (form:IVariantValueCreateForm) => {
        return FormValidator<IVariantValueCreateForm>(variantValueCreateFormSchema, form);
    }

    const variantTypeUpdateValidation = (form:IVariantTypeUpdateForm) => {
        return FormValidator<IVariantTypeUpdateForm>(updateVariantFormSchema, form);
    }

    const variantValueUpdateValidation = (form:IVariantValueUpdateForm) => {
        return FormValidator<IVariantValueUpdateForm>(updateVariantValueFormSchema, form);
    }

    const variantTypeDeleteValidation = (payload:IVariantTypeDeleteForm) => {
        return FormValidator<IVariantTypeDeleteForm>(deleteVariantTypeFormSchema, payload);
    }
    const variantValueDeleteValidation = (payload:IVariantValueDeleteForm) => {
        return FormValidator<IVariantValueDeleteForm>(deleteVariantValueFormSchema, payload);
    }


    return {
        variantTypeCreateValidation,
        variantValueCreateValidation,
        variantTypeUpdateValidation,
        variantValueUpdateValidation,
        variantTypeDeleteValidation,
        variantValueDeleteValidation,
    }
}



export default useVariantFormValidation;