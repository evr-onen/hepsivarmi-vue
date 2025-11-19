import {defineStore} from "pinia";
import useVariantService from "../services/useBrandService";
import useBrandFormValidation from "../validations/useBrandFormValidation";
import {
    allBrands,
    createBrandForm,
    createBrandFormErrors,
    getBrandsErrors,
    brandFormInlineAlert,
    updateBrandForm,
    updateBrandFormErrors,
    deleteBrandForm,
    deleteBrandFormErrors
} from '~/domains/brand/composables/variables'

const useBrandStore = defineStore('BrandStore', () => {
    const {
        createBrandValidation,
        updateBrandValidation,
        deleteBrandValidation
    } = useBrandFormValidation();

    const {
        getAllAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    } = useVariantService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetBrand = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allBrands.value = response.data.data;
            }
        })
    }

    const getBrands = async (successAction ?:()=> void ) => {
        await AxiosActionHandler(async () => {
                await getAllAction((response) => {
                    if(response.data.success) {
                        allBrands.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        getBrandsErrors.value = response.data.data.errors
                    }
                })
            },
            isGetActionLoading,
            getBrandsErrors,
        )
    }

    const createBrand = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(createBrandForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getBrands()
                            }else{
                                errorAction?.()
                                createBrandFormErrors.value = response.data.data.messages
                            }
                        })
                    },
                    createBrandFormErrors,
                    brandFormInlineAlert,
                    () => createBrandValidation(toRaw(createBrandForm.value))
                );
            },
            isCreateActionLoading,
            createBrandFormErrors,
            brandFormInlineAlert
        )
    }

    const updateBrand = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updateAction(toRaw(updateBrandForm.value), (response) => {
                    if(response.data.success) {
                        getBrands()
                        successAction?.()
                    }else{
                        errorAction?.()
                        updateBrandFormErrors.value = response.data.data.messages
                    }
                })
            },
                updateBrandFormErrors,
                brandFormInlineAlert,
        () => updateBrandValidation(toRaw(updateBrandForm.value))
        )},
            isUpdateActionLoading,
            updateBrandFormErrors,
            brandFormInlineAlert
        )
    }

    const deleteBrand = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(deleteBrandForm.value), (response) => {
                            if(response.data.success) {
                                getBrands()
                                successAction?.()
                            }else{
                                errorAction?.()
                                deleteBrandFormErrors.value = response.data.data.errors
                            }
                        })
                    },
                    deleteBrandFormErrors,
                    brandFormInlineAlert,
                    () => deleteBrandValidation(toRaw(deleteBrandForm.value))
                );
            },
            isDeleteActionLoading,
            deleteBrandFormErrors,
            brandFormInlineAlert
        )
    }

    return {
        resetBrand,
        getBrands,
        createBrand,
        updateBrand,
        deleteBrand
    }
})

export default useBrandStore;