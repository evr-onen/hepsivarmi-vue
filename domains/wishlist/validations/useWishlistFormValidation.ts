import { object, string } from 'yup';
import type {
    IWishlistCreateForm,
    IWishlistUpdateForm,
    IWishlistDeleteForm
} from "../types/wishlistTypes";

const useWishlistFormValidation = () => {
    const createWishlistFormSchema = object({
        product_id: string().required('Product ID is required'),
    })
    const updateWishlistFormSchema = object({
        user_id: string().required('User ID is required'),
        product_id: string().required('Product ID is required'),
    })
    const deleteWishlistFormSchema = object({
        user_id: string().required('User ID is required'),
        product_id: string().required('Product ID is required'),
    })

    const createWishlistValidation = (form:IWishlistCreateForm) => {
        return FormValidator<IWishlistCreateForm>(createWishlistFormSchema, form);
    }
    const updateWishlistValidation = (form:IWishlistUpdateForm) => {
        return FormValidator<IWishlistUpdateForm>(updateWishlistFormSchema, form);
    }
    const deleteWishlistValidation = (payload:IWishlistDeleteForm) => {
        return FormValidator<IWishlistDeleteForm>(deleteWishlistFormSchema, payload);
    }


    return {
        createWishlistValidation,
        updateWishlistValidation,
        deleteWishlistValidation,
    }
}



export default useWishlistFormValidation;