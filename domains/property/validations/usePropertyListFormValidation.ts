import { object, string } from 'yup';
import type {
    IPropertyListCreateForm, IPropertyListPropDeleteForm,
    IPropertyListUpdateForm
} from "../types/propertyListTypes";

// schemas
const usePropertyListFormValidation = () => {
    const createFormSchema = object({
        name        : string().required('Name is required'),
    })
    const updateFormSchema = object({
        name        : string().required('Name is required'),
    })
    const deleteFormSchema = object({
        id          : string().required('Property is required'),
    })

    const createValidation = (form:Partial<IPropertyListCreateForm>) => {
        return FormValidator<Partial<IPropertyListCreateForm>>(createFormSchema, form);
    }
    const updateValidation = (form:Partial<IPropertyListUpdateForm>) => {
        return FormValidator<Partial<IPropertyListUpdateForm>>(updateFormSchema, form);
    }
    const deleteValidation = (payload:Partial<IPropertyListPropDeleteForm>) => {
        return FormValidator<Partial<IPropertyListPropDeleteForm>>(deleteFormSchema, payload);
    }


    return {
        createValidation,
        updateValidation,
        deleteValidation,
    }
}



export default usePropertyListFormValidation;