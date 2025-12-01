import { object, string, array, number} from 'yup';
import type {
    IProductCreateForm,
    IProductUpdateForm,
    IProductDeleteForm
} from "../types/productTypes";

// schemas
const useProductFormValidation = () => {
    const createFormSchema = object({
        name                    : string().required('Name is required'),
        mainCategory            : object({id: string().required('Product Sub Category is required')}),
        subCategory             : object({id: string().required('Product Sub Category is required')}),
        brand                   : object({id: string().required('Product Sub Category is required')}),
        images                  : array().of(object({name: string().required('Images is required')})),
    })
    const updateFormSchema = object({
        id                      : string().required('Product ID is required'),
        name                    : string().required('Name is required'),
        mainCategory            : object({id: string().required('Product Sub Category is required')}),
        subCategory             : object({id: string().required('Product Sub Category is required')}),
        brand                   : object({id: string().required('Product Sub Category is required')}),
        variantTypes            : array().of(object({id: string().required('Variant Type is required')})),
        variantProducts         : array().of(object({price: number().required('Price is required')})),
        // properties              : object({propertyList: object({id: string().required('Property List is required')})}),
    })

    const deleteFormSchema = object({
        id          : string().required('Product ID is required'),
    })

    const createProductValidation = (form:IProductCreateForm) => {
        return FormValidator<IProductCreateForm>(createFormSchema, form);
    }

    const updateProductValidation = (form: IProductUpdateForm) => {
        return FormValidator<IProductUpdateForm>(updateFormSchema, form);
    }

    const deleteProductValidation = (payload:IProductDeleteForm) => {
        return FormValidator<IProductDeleteForm>(deleteFormSchema, payload);
    }
    return {
        createProductValidation,
        updateProductValidation,
        deleteProductValidation,
    }
}



export default useProductFormValidation;