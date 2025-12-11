import {defineStore} from "pinia";
import useCommentService from "../services/useCommentService";
import useCommentFormValidation from "../validations/useCommentFormValidation";

import {
    allCommentsByProduct,
    commentCreateForm,
    commentCreateErrors,
    commentUpdateForm,
    commentUpdateErrors,
    commentDeleteForm,
    commentDeleteErrors,
    commentFormInlineAlert,
    commentGetFormByProduct,
    commentGetForm,
    commentGetErrors,
} from '~/domains/comment/composables/variables'

const useCommentStore = defineStore('CommentStore', () => {
    const {
        createCommentValidation,
        updateCommentValidation,
        deleteCommentValidation
    } = useCommentFormValidation();

    const {
        getAllByProductAction,
        getByIdAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    } = useCommentService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetComment = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allCommentsByProduct.value = response.data.data;
            }
        })
    }

    const getCommentsByProduct = async (successAction ?:()=> void ) => {
        await AxiosActionHandler(async () => {
                await getAllByProductAction(toRaw(commentGetFormByProduct.value), (response) => {
                    if(response.data.success) {
                        allCommentsByProduct.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        commentGetErrors.value = response.data.data.errors
                    }
                })
            },
            isGetActionLoading,
            commentGetErrors,
        )
    }
    const getCommentById = async (successAction ?:()=> void ) => {
        await AxiosActionHandler(async () => {
                await getByIdAction(toRaw(commentGetForm.value), (response) => {
                    if(response.data.success) {
                        allCommentsByProduct.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        commentGetErrors.value = response.data.data.errors
                    }
                })
            },
            isGetActionLoading,
            commentGetErrors,
        )
    }

    const createComment = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(commentCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getCommentsByProduct()
                            }else{
                                errorAction?.()
                                commentCreateErrors.value = response.data.data.errors
                            }
                        })
                    },
                    commentCreateErrors,
                    commentFormInlineAlert,
                    () => createCommentValidation(toRaw(commentCreateForm.value))
                );
            },
            isCreateActionLoading,
            commentCreateErrors,
            commentFormInlineAlert
        )
    }

    const updateComment = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updateAction(toRaw(commentUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getCommentsByProduct()
                        successAction?.()
                    }else{
                        errorAction?.()
                        commentUpdateErrors.value = response.data.data.errors
                    }
                })
            },
                commentUpdateErrors,
                commentFormInlineAlert,
        () => updateCommentValidation(toRaw(commentUpdateForm.value))
        )},
            isUpdateActionLoading,
            commentUpdateErrors,
            commentFormInlineAlert
        )
    }

    const deleteComment = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(commentDeleteForm.value), (response) => {
                            if(response.data.success) {
                                getCommentsByProduct()
                                successAction?.()
                            }else{
                                errorAction?.()
                                commentDeleteErrors.value = response.data.data.errors
                            }
                        })
                    },
                    commentDeleteErrors,
                    commentFormInlineAlert,
                    () => deleteCommentValidation(toRaw(commentDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            commentDeleteErrors,
            commentFormInlineAlert
        )
    }

    return {
        resetComment,
        getCommentsByProduct,
        getCommentById,
        createComment,
        updateComment,
        deleteComment
    }
})

export default useCommentStore;