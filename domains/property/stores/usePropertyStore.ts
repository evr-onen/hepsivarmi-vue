// import {AxiosError} from "axios";
import usePropertyService from "../services/usePropertyService";
import usePropertyFormValidation from "../validations/usePropertyFormValidation";
import {defineStore} from "pinia";
import {
    propertyCreateFormEntity,
    propertyValueCreateFormEntity
} from "~/domains/property/entities/propertyEntity";
import {
    allProperties,
    propertyGetErrors,
    propertyCreateForm,
    propertyCreateErrors,
    propertyUpdateForm,
    propertyUpdateErrors,
    propertyDeleteForm,
    propertyDeleteErrors,
    propertyInlineAlert,
    propertyValueCreateForm,
    propertyValueCreateErrors,
    propertyValueUpdateForm,
    propertyValueUpdateErrors,
    propertyValueDeleteForm,
    propertyValueDeleteErrors
} from '~/domains/property/composables/variables'

const usePropertyStore = defineStore('PropertyStore', () => {
    const {
        createTypeValidation,
        createValueValidation,
        updatePropTypeValidation,
        updatePropValueValidation,
        deletePropTypeValidation,
        deletePropValueValidation,
    } = usePropertyFormValidation();

    const {
        getAllAction,
        resetAction,
        createPropertyTypeAction,
        createPropertyValueAction,
        updatePropertyTypeAction,
        deletePropertyTypeAction,
        deletePropertyValueAction,
    } = usePropertyService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetProperties = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allProperties.value = response.data.data;
            }
        })
    }

    const getProperties = async (successAction ?:()=> void ) => {
        isGetActionLoading.value = true;
        await getAllAction((response)=>{
                    if(response.data.success) {
                        allProperties.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        propertyGetErrors.value = response.data.data.messages
                    }
        })
        isGetActionLoading.value = false;

    }

    const createPropertyType = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createPropertyTypeAction(toRaw(propertyCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                propertyCreateForm.value = propertyCreateFormEntity({})

                                getProperties()
                            }else{
                                errorAction?.()
                                propertyCreateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyCreateErrors,
                    propertyInlineAlert,
                    () => createTypeValidation(toRaw(propertyCreateForm.value))
                );
            },
            isCreateActionLoading,
            propertyCreateErrors,
            propertyInlineAlert
        )
    }
    const createPropertyValue = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createPropertyValueAction(toRaw(propertyValueCreateForm.value), async (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                propertyValueCreateForm.value = propertyValueCreateFormEntity({})
                                await getProperties()
                                const updatePropertyItemIndex = allProperties.value.findIndex(item => item.id === propertyUpdateForm.value.id)
                                const updateItem = allProperties.value[updatePropertyItemIndex]
                                propertyUpdateForm.value = {id:updateItem.id, name: updateItem.name, isFilterItem:updateItem.isFilterItem, values: updateItem.values}
                            }else{
                                errorAction?.()
                                propertyValueCreateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyValueCreateErrors,
                    propertyInlineAlert,
                    () => createValueValidation(toRaw(propertyValueCreateForm.value))
                );
            },
            isCreateActionLoading,
            propertyValueCreateErrors,
            propertyInlineAlert
        )
    }

    const updatePropertyType = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updatePropertyTypeAction(toRaw(propertyUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getProperties()
                        successAction?.()
                    }else{
                        errorAction?.()
                        propertyUpdateErrors.value = response.data.data.messages
                    }
                })
            },
                propertyUpdateErrors,
                propertyInlineAlert,
        () => updatePropTypeValidation(toRaw(propertyUpdateForm.value))
        )},
            isUpdateActionLoading,
            propertyUpdateErrors,
            propertyInlineAlert
        )
    }
    const updatePropertyValue = async (successAction?:()=> void, errorAction?:()=> void) => {

        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await updatePropertyTypeAction(toRaw(propertyValueUpdateForm.value), async (response) => {
                    if(response.data.success) {
                        await getProperties()
                        const updatePropertyItemIndex = allProperties.value.findIndex(item => item.id === propertyUpdateForm.value.id)
                        const updateItem = allProperties.value[updatePropertyItemIndex]
                        propertyUpdateForm.value = {id:updateItem.id, name: updateItem.name, isFilterItem:updateItem.isFilterItem, values: updateItem.values}
                        successAction?.()
                    }else{
                        errorAction?.()
                        propertyValueUpdateErrors.value = response.data.data.messages
                    }
                })
            },
                propertyValueUpdateErrors,
                propertyInlineAlert,
        () => updatePropValueValidation(toRaw(propertyValueUpdateForm.value))
        )},
            isUpdateActionLoading,
            propertyValueUpdateErrors,
            propertyInlineAlert
        )
    }


    const deletePropertyType = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deletePropertyTypeAction(toRaw(propertyDeleteForm.value), (response) => {
                            if(response.data.success) {
                                getProperties()
                                successAction?.()
                            }else{
                                errorAction?.()
                                propertyDeleteErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyDeleteErrors,
                    propertyInlineAlert,
                    () => deletePropTypeValidation(toRaw(propertyDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            propertyDeleteErrors,
            propertyInlineAlert
        )
    }

    const deletePropertyValue = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deletePropertyValueAction(toRaw(propertyValueDeleteForm.value), async (response) => {
                            if(response.data.success) {
                                await getProperties()
                                const updatePropertyItemIndex = allProperties.value.findIndex(item => item.id === propertyUpdateForm.value.id)
                                const updateItem = allProperties.value[updatePropertyItemIndex]
                                propertyUpdateForm.value = {id:updateItem.id, name: updateItem.name, isFilterItem:updateItem.isFilterItem, values: updateItem.values}
                                successAction?.()
                            }else{
                                errorAction?.()
                                propertyValueDeleteErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyValueDeleteErrors,
                    propertyInlineAlert,
                    () => deletePropValueValidation(toRaw(propertyValueDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            propertyValueDeleteErrors,
            propertyInlineAlert
        )
    }



    return {
        resetProperties,
        getProperties,
        createPropertyType,
        createPropertyValue,
        updatePropertyType,
        updatePropertyValue,
        deletePropertyType,
        deletePropertyValue,
    }
})

export default usePropertyStore;