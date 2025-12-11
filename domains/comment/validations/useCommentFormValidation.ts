import { object, string, number } from 'yup';
import type {
    ICommentCreateForm,
    ICommentUpdateForm,
    ICommentDeleteForm
} from "../types/commentTypes";

const useCommentFormValidation = () => {
    const createCommentFormSchema = object({
        product_id: string().required('Product ID is required'),
        text: string().required('Text is required'),
        rating: number().required('Rating is required'),
    })
    const updateCommentFormSchema = object({
        id: string().required('Comment ID is required'),
        product_id: string().required('Product ID is required'),
        text: string().required('Text is required'),
        rating: number().required('Rating is required'),
    })
    const deleteCommentFormSchema = object({
        id: string().required('Comment ID is required'),
    })


    const createCommentValidation = (form:ICommentCreateForm) => {
        return FormValidator<ICommentCreateForm>(createCommentFormSchema, form);
    }
    const updateCommentValidation = (form:ICommentUpdateForm) => {
        return FormValidator<ICommentUpdateForm>(updateCommentFormSchema, form);
    }
    const deleteCommentValidation = (payload:ICommentDeleteForm) => {
        return FormValidator<ICommentDeleteForm>(deleteCommentFormSchema, payload);
    }


    return {
        createCommentValidation,
        updateCommentValidation,
        deleteCommentValidation,
    }
}



export default useCommentFormValidation;