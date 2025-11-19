// import {AxiosError} from "axios";
import useCategoryService from "../services/useCategoryService";
import useCategoryFormValidation from "../validations/useCategoryFormValidation";
import {defineStore} from "pinia";
import { mainCategoryDeleteFormEntity} from "~/domains/category/entities/categoryEntity";
import {
    allCategories,
    mainCategoryCreateForm,
    mainCategoryUpdateForm,
    mainCategoryCreateErrors,
    mainCategoryUpdateErrors,
    mainCategoryDeleteErrors,
    subCategoryCreateForm,
    subCategoryUpdateForm,
    subCategoryCreateErrors,
    subCategoryUpdateErrors,
    subCategoryDeleteErrors,
    categoryGetErrors,
    categoryFormInlineAlert,
    mainCategoryFormInlineAlert,
    subCategoryFormInlineAlert,
} from '~/domains/category/composables/variables'
import type {IMainCategoryDeleteForm, ISubCategoryDeleteForm} from "~/domains/category/types/categoryTypes";

const useCategoryStore = defineStore('CategoryStore', () => {
    const {
        mainCategoryCreateValidation,
        mainCategoryUpdateValidation,
        mainCategoryDeleteValidation,
        subCategoryCreateValidation,
        subCategoryUpdateValidation,
        subCategoryDeleteValidation,
    } = useCategoryFormValidation();

    const {
        categoryGetAllAction,
        categoryResetAction,
        categoryMainCreateAction,
        categorySubCreateAction,
        categoryMainUpdateAction,
        categorySubUpdateAction,
        categoryMainDeleteAction,
        categorySubDeleteAction,
    } = useCategoryService();

    // STATES
    const isMainCreateActionLoading = ref<boolean>(false);
    const isSubCreateActionLoading = ref<boolean>(false);
    const isGetActionLoading = ref<boolean>(false)
    const isUpdateMainActionLoading = ref<boolean>(false)
    const isUpdateSubActionLoading = ref<boolean>(false)
    const isDeleteMainActionLoading = ref<boolean>(false)
    const isDeleteSubActionLoading = ref<boolean>(false)

    // API Actions
    const resetCategories = async()=>{
        await categoryResetAction((response ) => {
            if(response.data.success) {
                allCategories.value = response.data.data;
            }
        })
    }

    const getCategories = async (successAction ?:()=> void ) => {
        await categoryGetAllAction((response)=>{
                    if(response.data.success) {
                        allCategories.value = structuredClone(response.data.data)
                        successAction?.()

                    }else{
                        categoryGetErrors.value = response.data.data.errors
                    }
        })

    }

    const createMainCategory = async (successAction?:(response:any)=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await categoryMainCreateAction(toRaw(mainCategoryCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.(response.data)
                                getCategories()
                            }else{
                                errorAction?.()
                                mainCategoryCreateErrors.value = response.data.data.errors
                                console.log(errorAction)
                            }
                        })
                    },
                    mainCategoryCreateErrors,
                    mainCategoryFormInlineAlert,
                    () => mainCategoryCreateValidation(toRaw(mainCategoryCreateForm.value))
                );
            },
            isMainCreateActionLoading,
            mainCategoryCreateErrors,
            mainCategoryFormInlineAlert
        )
    }


    const createSubCategory = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await categorySubCreateAction(toRaw(subCategoryCreateForm.value), (response) => {
                            if(response.data.success) {
                                successAction?.()
                                getCategories()
                            }else{
                                errorAction?.()
                                subCategoryCreateErrors.value = response.data.data.errors
                            }
                        })
                    },
                    subCategoryCreateErrors,
                    subCategoryFormInlineAlert,
                    () => subCategoryCreateValidation(toRaw(subCategoryCreateForm.value))
                );
            },
            isSubCreateActionLoading,
            subCategoryCreateErrors,
            subCategoryFormInlineAlert
        )
    }



    const updateMainCategory = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
            await ClientSideFormValidatorHandler(async () => {
                await categoryMainUpdateAction(toRaw(mainCategoryUpdateForm.value), (response) => {
                    if(response.data.success) {
                        getCategories()
                        successAction?.()
                    }else{
                        errorAction?.()
                        mainCategoryUpdateErrors.value = response.data.data.errors
                    }
                })
            },
                mainCategoryUpdateErrors,
                categoryFormInlineAlert,
        () => mainCategoryUpdateValidation(toRaw(mainCategoryUpdateForm.value))
        )},
            isUpdateMainActionLoading,
            mainCategoryUpdateErrors,
            categoryFormInlineAlert
        )
    }

    const updateSubCategory = async (successAction?:()=> void, errorAction?:()=> void) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await categorySubUpdateAction(toRaw(subCategoryUpdateForm.value), (response) => {
                            if(response.data.success) {
                                getCategories()
                                successAction?.()
                            }else{
                                errorAction?.()
                                subCategoryUpdateErrors.value = response.data.data.errors
                            }
                        })
                    },
                    subCategoryUpdateErrors,
                    categoryFormInlineAlert,
                    () => subCategoryUpdateValidation(toRaw(subCategoryUpdateForm.value))
                );
            },
            isUpdateSubActionLoading,
            subCategoryUpdateErrors,
            categoryFormInlineAlert
        )
    }

    const deleteMainCategory = async (deleteCategory:IMainCategoryDeleteForm, successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await categoryMainDeleteAction(deleteCategory, (response) => {
                            if(response.data.success) {
                                getCategories()
                                successAction?.()
                            }else{
                                errorAction?.()
                                mainCategoryDeleteErrors.value = response.data.data.errors
                            }
                        })
                    },
                    mainCategoryDeleteErrors,
                    categoryFormInlineAlert,
                    () => mainCategoryDeleteValidation(mainCategoryDeleteFormEntity(deleteCategory) )
                );
            },
            isDeleteMainActionLoading,
            mainCategoryDeleteErrors,
            categoryFormInlineAlert
        )
    }

    const deleteSubCategory = async (payload:ISubCategoryDeleteForm, successAction ?:()=> void, errorAction ?:()=> void,) => {
        await AxiosActionHandler(async () => {
                await ClientSideFormValidatorHandler(async () => {
                        await categorySubDeleteAction(payload, (response) => {
                            if(response.data.success) {
                                getCategories()
                                successAction?.()
                            }else{
                                errorAction?.()
                                subCategoryDeleteErrors.value = response.data.data.errors
                            }
                        })
                    },
                    subCategoryDeleteErrors,
                    categoryFormInlineAlert,
                    () => subCategoryDeleteValidation(toRaw(payload))
                );
            },
            isDeleteSubActionLoading,
            subCategoryDeleteErrors,
            categoryFormInlineAlert
        )
    }

    return {
        resetCategories,
        getCategories,
        createMainCategory,
        createSubCategory,
        updateMainCategory,
        updateSubCategory,
        deleteMainCategory,
        deleteSubCategory
    }
})

export default useCategoryStore;