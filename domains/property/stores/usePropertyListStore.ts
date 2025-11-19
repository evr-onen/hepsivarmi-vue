import usePropertyListService from "../services/usePropertyListService";
import usePropertyListFormValidation from "../validations/usePropertyListFormValidation";
import {defineStore} from "pinia";
import {
    allPropertyList,
    propertyListGetErrors,
    propertyListCreateForm,
    propertyListCreateErrors,
    PropertyListFormInlineAlert,

    propertyListUpdateForm,
    propertyListUpdateErrors,
    propertyListDeleteForm,
    propertyListDeleteErrors,
} from '~/domains/property/composables/variables'

const usePropertyListStore = defineStore('PropertyListStore', () => {
    const {
        getAllAction,
        resetAction,
        createAction,
        updateAction,
        deleteAction,
    } = usePropertyListService()

    const {
        createValidation,
        updateValidation,
        deleteValidation,
    } = usePropertyListFormValidation();

    const {

    } = usePropertyListService();

    // STATES
    const isGetActionLoading = ref<boolean>(false)
    const isCreateActionLoading = ref<boolean>(false);
    const isUpdateActionLoading = ref<boolean>(false)
    const isDeleteActionLoading = ref<boolean>(false)

    // API Actions
    const resetPropertyList = async()=>{
        await resetAction((response ) => {
            if(response.data.success) {
                allPropertyList.value = response.data.data;
            }
        })
    }

    const getPropertyLists = async (successAction ?:()=> void ) => {
        isGetActionLoading.value = true;
        await getAllAction((response)=>{
                    if(response.data.success) {
                        allPropertyList.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        propertyListGetErrors.value = response.data.data.messages
                    }
                    isGetActionLoading.value = false;
        })

    }

    const createPropertyList = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await createAction(toRaw(propertyListCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getPropertyLists()
                            }else{
                                errorAction?.()
                                propertyListCreateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyListCreateErrors,
                    PropertyListFormInlineAlert,
                    () => createValidation(toRaw(propertyListCreateForm.value))
                );
            },
            isCreateActionLoading,
            propertyListCreateErrors,
            PropertyListFormInlineAlert
        )
    }

    const updatePropertyList = async (successAction?:()=> void, errorAction?:()=> void) => {

        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await updateAction(toRaw(propertyListUpdateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.()
                                getPropertyLists()
                            }else{
                                errorAction?.()
                                propertyListUpdateErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyListUpdateErrors,
                    PropertyListFormInlineAlert,
                    () => updateValidation(toRaw(propertyListUpdateForm.value))
                );
            },
            isUpdateActionLoading,
            propertyListUpdateErrors,
            PropertyListFormInlineAlert
        )
    }

    const deletePropertyList = async ( successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await deleteAction(toRaw(propertyListDeleteForm.value), (response) => {
                            if(response.data.success) {
                                getPropertyLists()
                                successAction?.()
                            }else{
                                errorAction?.()
                                propertyListDeleteErrors.value = response.data.data.messages
                            }
                        })
                    },
                    propertyListDeleteErrors,
                    PropertyListFormInlineAlert,
                    () => deleteValidation(toRaw(propertyListDeleteForm.value))
                );
            },
            isDeleteActionLoading,
            propertyListDeleteErrors,
            PropertyListFormInlineAlert
        )
    }

    return {
        resetPropertyList,
        getPropertyLists,
        createPropertyList,
        updatePropertyList,
        deletePropertyList,
    }
})

export default usePropertyListStore;