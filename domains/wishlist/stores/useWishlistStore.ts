import {defineStore} from "pinia";
import useWishlistService from "../services/useWishlistService";
import useWishlistFormValidation from "../validations/useWishlistFormValidation";

import {
    allWishlistsByUser,
    wishlistCreateForm,
    wishlistCreateErrors,
    wishlistUpdateForm,
    wishlistUpdateErrors,
    wishlistDeleteForm,
    wishlistDeleteErrors,
    wishlistFormInlineAlert,
    wishlistGetFormByUser,
    wishlistGetErrors,
} from '~/domains/wishlist/composables/variables'

const useCommentStore = defineStore('WishlistStore', () => {
    const {
        createWishlistValidation,
        updateWishlistValidation,
        deleteWishlistValidation
    } = useWishlistFormValidation();

    const {
        getAllByUserAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    } = useWishlistService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetWishlist = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allWishlistsByUser.value = response.data.data;
            }
        })
    }

    const getWishlistsByUser = async (successAction ?:()=> void ) => {
        await AxiosActionHandler(async () => {
                await getAllByUserAction(toRaw(wishlistGetFormByUser.value), (response) => {
                    if(response.data.success) {
                        allWishlistsByUser.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        wishlistGetErrors.value = response.data.data.errors
                    }
                })
            },
            isGetActionLoading,
            wishlistGetErrors,
        )
    }
    

    const createWishlist = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        console.log(wishlistCreateForm.value)
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(wishlistCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getWishlistsByUser()
                            }else{
                                errorAction?.()
                                wishlistCreateErrors.value = response.data.data.errors
                            }
                        })
                    },
                    wishlistCreateErrors,
                    wishlistFormInlineAlert,
                    () => createWishlistValidation(toRaw(wishlistCreateForm.value))
                );
            },
            isCreateActionLoading,
            wishlistCreateErrors,
            wishlistFormInlineAlert
        )
    }

    const updateWishlist = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updateAction(toRaw(wishlistUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getWishlistsByUser()
                        successAction?.()
                    }else{
                        errorAction?.()
                        wishlistUpdateErrors.value = response.data.data.errors
                    }
                })
            },
                wishlistUpdateErrors,
                wishlistFormInlineAlert,
        () => updateWishlistValidation(toRaw(wishlistUpdateForm.value))
        )},
            isUpdateActionLoading,
            wishlistUpdateErrors,
            wishlistFormInlineAlert
        )
    }

    const deleteWishlist = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        console.log(wishlistDeleteForm.value)
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(wishlistDeleteForm.value), (response) => {
                            if(response.data.success) {
                                getWishlistsByUser()
                                successAction?.()
                            }else{
                                errorAction?.()
                                wishlistDeleteErrors.value = response.data.data.errors
                            }
                        })
                    },
                    wishlistDeleteErrors,
                    wishlistFormInlineAlert,
                    () => deleteWishlistValidation(toRaw(wishlistDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            commentDeleteErrors,
            commentFormInlineAlert
        )
    }

    return {
        resetWishlist,
        getWishlistsByUser,
        createWishlist,
        updateWishlist,
        deleteWishlist
    }
})

export default useCommentStore;