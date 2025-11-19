import { object, string } from 'yup';
import type {
    IPropTypeCreateForm,
    IPropTypeValueUpdateForm,
    IPropTypeValueDeleteForm,
    IPropTypeDeleteForm,
    IPropTypeUpdateForm, IPropTypeValueCreateForm
} from "../types/propertyTypes";

// schemas
const usePropertyFormValidation = () => {
    const createFormSchema = object({
        name        : string().required('Name is required'),
    })
    const updateFormSchema = object({
        name        : string().required('Name is required'),
    })
    const deleteFormSchema = object({
        id          : string().required('Property is required'),
    })

    const createTypeValidation = (form:IPropTypeCreateForm) => {
        return FormValidator<IPropTypeCreateForm>(createFormSchema, form);
    }
    const createValueValidation = (form:IPropTypeValueCreateForm) => {
        return FormValidator<IPropTypeValueCreateForm>(createFormSchema, form);
    }
    const updatePropTypeValidation = (form: IPropTypeUpdateForm) => {
        return FormValidator<IPropTypeUpdateForm>(updateFormSchema, form);
    }
    const updatePropValueValidation = (form:IPropTypeValueUpdateForm ) => {
        return FormValidator<IPropTypeValueUpdateForm>(updateFormSchema, form);
    }
    const deletePropTypeValidation = (payload:IPropTypeDeleteForm) => {
        return FormValidator<IPropTypeDeleteForm>(deleteFormSchema, payload);
    }
    const deletePropValueValidation = (payload:IPropTypeValueDeleteForm ) => {
        return FormValidator<IPropTypeValueDeleteForm>(deleteFormSchema, payload);
    }


    return {
        createTypeValidation,
        createValueValidation,
        updatePropTypeValidation,
        updatePropValueValidation,
        deletePropTypeValidation,
        deletePropValueValidation,
    }
}



export default usePropertyFormValidation;