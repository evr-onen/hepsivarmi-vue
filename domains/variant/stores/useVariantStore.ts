// import {AxiosError} from "axios";
import useVariantService from "../services/useVariantService";
import useVariantFormValidation from "../validations/useVariantFormValidation";
import {
    allVariants,
    variantTypeCreateForm,
    variantTypeUpdateForm,
    variantTypeCreateErrors,
    variantTypeUpdateErrors,
    variantTypeDeleteErrors,
    variantValueCreateForm,
    variantValueUpdateForm,
    variantValueCreateErrors,
    variantValueUpdateErrors,
    variantValueDeleteErrors,
    variantGetErrors,
    variantFormInlineAlert,
    variantTypeFormInlineAlert,
    variantValueFormInlineAlert, variantUpdateForm,
} from '~/domains/variant/composables/variables'
import {defineStore} from "pinia";
import {variantTypeDeleteFormEntity} from "~/domains/variant/entities/variantEntity";
import type {IVariantTypeDeleteForm, IVariantValueDeleteForm} from "~/domains/variant/types/variantTypes";

const useVariantStore = defineStore('VariantStore', () => {
    const {
        variantTypeCreateValidation,
        variantValueCreateValidation,
        variantTypeUpdateValidation,
        variantValueUpdateValidation,
        variantTypeDeleteValidation,
        variantValueDeleteValidation,
    } = useVariantFormValidation();

    const {
        variantGetAllAction,
        variantResetAction,
        variantTypeCreateAction,
        variantValueCreateAction,
        variantUpdateAction,
        variantValueUpdateAction,
        variantTypeDeleteAction,
        variantValueDeleteAction,
    } = useVariantService();

    // STATES
    const isTypeCreateActionLoading = ref<boolean>(false);
    const isValueCreateActionLoading = ref<boolean>(false);
    const isGetActionLoading = ref<boolean>(false)
    const isUpdateTypeActionLoading = ref<boolean>(false)
    const isUpdateValueActionLoading = ref<boolean>(false)
    const isDeleteTypeActionLoading = ref<boolean>(false)
    const isDeleteValueActionLoading = ref<boolean>(false)

    // API Actions
    const resetVariants = async()=>{
        await variantResetAction((response ) => {
            if(response.data.success) {
                allVariants.value = response.data.data;
            }else{
                variantGetErrors.value = response.data.data.messages
            }
        })
    }

    const getVariants = async (successAction ?:()=> void ) => {
        await AxiosActionHandler(async () => {
                await variantGetAllAction((response) => {
                    if(response.data.success) {
                        allVariants.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        variantGetErrors.value = response.data.data.messages
                    }
                })
            },
            isGetActionLoading,
            variantGetErrors,
        )
    }

    const createVariantType = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await variantTypeCreateAction(toRaw(variantTypeCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getVariants()
                            }else{
                                errorAction?.()
                                variantTypeCreateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    variantTypeCreateErrors,
                    variantTypeFormInlineAlert,
                    () => variantTypeCreateValidation(toRaw(variantTypeCreateForm.value))
                );
            },
            isTypeCreateActionLoading,
            variantTypeCreateErrors,
            variantTypeFormInlineAlert
        )
    }


    const createVariantValue = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await variantValueCreateAction(toRaw(variantValueCreateForm.value), async(response) => {
                            if(response.data.success) {
                                await getVariants()
                                successAction?.(response.data)
                            }else{
                                errorAction?.()
                                variantValueCreateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    variantValueCreateErrors,
                    variantValueFormInlineAlert,
                    () => variantValueCreateValidation(toRaw(variantValueCreateForm.value))
                );
            },
            isValueCreateActionLoading,
            variantValueCreateErrors,
            variantValueFormInlineAlert
        )
    }



    const updateVariant = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await variantUpdateAction(toRaw(variantUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getVariants()
                        successAction?.()
                    }else{
                        errorAction?.()
                        variantTypeUpdateErrors.value = response.data.data.messages
                    }
                })
            },
                variantTypeUpdateErrors,
                variantFormInlineAlert,
        () => variantTypeUpdateValidation(toRaw(variantUpdateForm.value))
        )},
            isUpdateTypeActionLoading,
            variantTypeUpdateErrors,
            variantFormInlineAlert
        )
    }

    const updateVariantValue = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await variantValueUpdateAction(toRaw(variantValueUpdateForm.value), (response) => {
                            if(response.data.success) {
                                getVariants()
                                successAction?.(response.data)
                            }else{
                                errorAction?.()
                                variantValueUpdateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    variantValueUpdateErrors,
                    variantFormInlineAlert,
                    () => variantValueUpdateValidation(toRaw(variantValueUpdateForm.value))
                );
            },
            isUpdateValueActionLoading,
            variantValueUpdateErrors,
            variantFormInlineAlert
        )
    }

    const deleteVariantType = async (deleteVariant:IVariantTypeDeleteForm, successAction ?:()=> void, errorAction ?:()=> void,) => {
       console.log(deleteVariant)
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await variantTypeDeleteAction(deleteVariant, (response) => {
                            if(response.data.success) {
                                getVariants()
                                successAction?.()
                            }else{
                                errorAction?.()
                                variantTypeDeleteErrors.value = response.data.data.messages
                            }
                        })
                    },
                    variantTypeDeleteErrors,
                    variantFormInlineAlert,
                    () => variantTypeDeleteValidation(variantTypeDeleteFormEntity(deleteVariant) )
                );
            },
            isDeleteTypeActionLoading,
            variantTypeDeleteErrors,
            variantFormInlineAlert
        )
    }

    const deleteVariantValue = async (payload:IVariantValueDeleteForm, successAction ?:(response:any)=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await variantValueDeleteAction(payload, (response:any) => {
                            if(response.data.success) {
                                getVariants()
                                successAction?.(response.data)
                            }else{
                                errorAction?.()
                                variantValueDeleteErrors.value = response.data.data.messages
                            }
                        })
                    },
                    variantValueDeleteErrors,
                    variantFormInlineAlert,
                    () => variantValueDeleteValidation(toRaw(payload))
                );
            },
            isDeleteValueActionLoading,
            variantValueDeleteErrors,
            variantFormInlineAlert
        )
    }

    return {

        getVariants,
        resetVariants,
        createVariantType,
        createVariantValue,
        updateVariant,
        updateVariantValue,
        deleteVariantType,
        deleteVariantValue
    }
})

export default useVariantStore;