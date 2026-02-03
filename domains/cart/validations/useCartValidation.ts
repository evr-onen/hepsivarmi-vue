import { object, string, number, array } from 'yup';
import type {
    ICartCreateForm,
    ICartQuantityUpdateForm,
    ICartDeleteForm
} from "../types/cartTypes";

const useCartFormValidation = () => {
    const createCartFormSchema = object({
        product_id: string().required('Product ID is required'),
        category_id: string().required('Category ID is required'),
        quantity: number().required('Quantity is required'),
        price: number().required('Price is required'),
        variant: array().of(object({
            id: string().required('Variant ID is required'),
            typeName: string().required('Variant Type Name is required'),
            value: string().required('Variant Value is required'),
        })),
    })
    const updateCartFormSchema = object({
        id: string().required('Cart ID is required'),
        product_id: string().required('Product ID is required'),
        category_id: string().required('Category ID is required'),
        quantity: number().required('Quantity is required'),
        price: number().required('Price is required'),
        variant: array().of(object({
            id: string().required('Variant ID is required'),
            typeName: string().required('Variant Type Name is required'),
            value: string().required('Variant Value is required'),
        })),
    })
    const deleteCartFormSchema = object({
        id: string().required('Cart ID is required'),
    })


    const createCartValidation = (form:ICartCreateForm) => {
        return FormValidator<ICartCreateForm>(createCartFormSchema, form);
    }
    const updateCartValidation = (form:ICartQuantityUpdateForm) => {
        return FormValidator<ICartQuantityUpdateForm>(updateCartFormSchema, form);
    }
    const deleteCartValidation = (payload:ICartDeleteForm) => {
        return FormValidator<ICartDeleteForm>(deleteCartFormSchema, payload);
    }


    return {
        createCartValidation,
        updateCartValidation,
        deleteCartValidation,
    }
}



export default useCartFormValidation;