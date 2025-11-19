import useCategoryStore from '../stores/useCategoryStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import { mainCategoryCreateFormEntity, subCategoryCreateFormEntity} from "~/domains/category/entities/categoryEntity";
import {
    isOpenMainCategoryModal,
    isOpenCreateModal,
    mainCategoryCreateForm,
    subCategoryCreateForm,
    mainCategoryCreateErrors,
    subCategoryCreateErrors,
    mainCategory
} from './variables'

const useCreateCategory = () => {
    const store = useCategoryStore();
    const { showSuccess, showError } = useToast()

    const onCreateMainCategory = async() => {
        await store.createMainCategory((response)=>{
                isOpenMainCategoryModal.value = false
                resetMainCategoryForm()
                if(isOpenCreateModal.value) mainCategory.value = response.data
                showSuccess('Main Category created successfully!')
            }, ()=>showError('Main Category can not create!')
        )
    }

    const onCreateSubCategory = async() => {
        await store.createSubCategory( ()=>{
                isOpenCreateModal.value = false
                resetSubCategoryForm()
                resetMainCategoryForm()
                showSuccess('Sub Category created successfully!')
            }, ()=>showError('Sub Category can not create!')
        )
    }

    const onResetCategories = async() => {
        console.log("Reset Variant")
        await store.resetCategories()
    }

    const resetMainCategoryForm = () => {
        mainCategoryCreateForm.value = mainCategoryCreateFormEntity({})
        mainCategoryCreateErrors.value = {}
    }

    const resetSubCategoryForm = () => {
        subCategoryCreateForm.value = subCategoryCreateFormEntity({})
        subCategoryCreateErrors.value = {}

    }

    return {
        onCreateMainCategory,
        onCreateSubCategory,
        onResetCategories,
    }
}

export default useCreateCategory;