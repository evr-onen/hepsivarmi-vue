// import {AxiosError} from "axios";
import useProductService from "../services/useProductService";
import useProductFormValidation from "../validations/useProductFormValidation";
import {defineStore} from "pinia";
import {
    allProducts,
    getProductErrors,
    createProductForm,
    updateProductForm,
    deleteProductForm,
    createProductFormErrors,
    updateProductFormErrors,
    deleteProductFormErrors,
    productFormInlineAlert,
} from '~/domains/product/composables/variables'

const useProductStore = defineStore('ProductStore', () => {
    const {
        createProductValidation,
        updateProductValidation,
        deleteProductValidation,
    } = useProductFormValidation();

    const {
        getAllAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    } = useProductService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetProducts = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allProducts.value = structuredClone(response.data.data)
            }
        })
    }

    const getProducts = async (successAction ?:()=> void ) => {
        isGetActionLoading.value = true;
        await getAllAction((response)=>{
                    if(response.data.success) {
                        allProducts.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        getProductErrors.value = response.data.data.messages
                    }
        })
        isGetActionLoading.value = false;
    }

    const createProduct = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        console.log(createProductForm.value)
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(createProductForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getProducts()
                            }else{
                                errorAction?.()
                                createProductFormErrors.value = response.data.data.messages
                            }
                        })
                    },
                    createProductFormErrors,
                    productFormInlineAlert,
                    () => createProductValidation(toRaw(createProductForm.value))
                );
            },
            isCreateActionLoading,
            createProductFormErrors,
            productFormInlineAlert
        )
    }

    const updateProduct = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updateAction(toRaw(updateProductForm.value), (response) => {
                    if(response.data.success) {
                        getProducts()
                        successAction?.()
                    }else{
                        errorAction?.()
                        updateProductFormErrors.value = response.data.data.messages
                    }
                })
            },
                updateProductFormErrors,
                productFormInlineAlert,
        () => updateProductValidation(toRaw(updateProductForm.value))
        )},
            isUpdateActionLoading,
            updateProductFormErrors,
            productFormInlineAlert
        )
    }

    const deleteProduct = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(deleteProductForm.value), (response) => {
                            if(response.data.success) {
                                getProducts()
                                successAction?.()
                            }else{
                                errorAction?.()
                                deleteProductFormErrors.value = response.data.data.messages
                            }
                        })
                    },
                    deleteProductFormErrors,
                    productFormInlineAlert,
                    () => deleteProductValidation(toRaw(deleteProductForm.value))
                );
            },
            isDeleteActionLoading,
            deleteProductFormErrors,
            productFormInlineAlert
        )
    }
    return {
        resetProducts,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    }
})

export default useProductStore;