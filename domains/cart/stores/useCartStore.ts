import {defineStore} from "pinia";
import useCartService from "../services/useCartService";
import useCartFormValidation from "../validations/useCartValidation";
import useAuthStore from "~/domains/auth/stores/useAuthStore";
import {
    allCartsByUser,
    cartCreateForm,
    cartCreateErrors,
    cartQuantityUpdateForm,
    cartQuantityUpdateErrors,
    cartDeleteForm,
    cartDeleteErrors,
    cartFormInlineAlert,
    cartGetFormByUser,
    cartGetErrors,
} from '~/domains/cart/composables/variables'

const useCartStore = defineStore('CartStore', () => {
    const {user} = useAuthStore();
    const {
        createCartValidation,
        updateCartValidation,
        deleteCartValidation
    } = useCartFormValidation();

    const {
        getAllByUserAction,
        createAction,
        updateAction,
        deleteAction,
    } = useCartService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    // const resetCart = async()=>{
    //     await resetAction((response ) => {
    //         if(response.data.success) {
    //             allCartsByUser.value = response.data.data;
    //         }
    //     })
    // }

    const getCartsByUser = async (successAction ?:()=> void ) => {
        cartGetFormByUser.value.user_id = user.id!
        await AxiosActionHandler(async () => {
                await getAllByUserAction(toRaw(cartGetFormByUser.value), (response) => {
                    if(response.data.success) {
                        allCartsByUser.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        cartGetErrors.value = response.data.data.errors
                    }
                })
            },
            isGetActionLoading,
            cartGetErrors,
        )
    }

    const createCart = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(cartCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getCartsByUser()
                            }else{
                                errorAction?.()
                                cartCreateErrors.value = response.data.data.errors
                            }
                        })
                    },
                    cartCreateErrors,
                    cartFormInlineAlert,
                    () => createCartValidation(toRaw(cartCreateForm.value))
                );
            },
            isCreateActionLoading,
            cartCreateErrors,
            cartFormInlineAlert
        )
    }

    const updateCartQuantity = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updateAction(toRaw(cartQuantityUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getCartsByUser()
                        successAction?.()
                    }else{
                        errorAction?.()
                        cartQuantityUpdateErrors.value = response.data.data.errors
                    }
                })
            },
                cartQuantityUpdateErrors,
                cartFormInlineAlert,
        () => updateCartValidation(toRaw(cartQuantityUpdateForm.value))
        )},
            isUpdateActionLoading,
            cartQuantityUpdateErrors,
            cartFormInlineAlert
        )
    }

    const deleteCart = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(cartDeleteForm.value), (response) => {
                            if(response.data.success) {
                                getCartsByUser()
                                successAction?.()
                            }else{
                                errorAction?.()
                                cartDeleteErrors.value = response.data.data.errors
                            }
                        })
                    },
                    cartDeleteErrors,
                    cartFormInlineAlert,
                    () => deleteCartValidation(toRaw(cartDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            cartDeleteErrors,
            cartFormInlineAlert
        )
    }

    return {
        getCartsByUser,
        createCart,
        updateCartQuantity,
        deleteCart
    }
})

export default useCartStore;