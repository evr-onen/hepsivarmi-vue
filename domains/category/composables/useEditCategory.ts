import useCategoryStore from '../stores/useCategoryStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    createSubCategoryErrorsEntity,
    mainCategoryUpdateFormEntity,
    subCategoryUpdateFormEntity, updateMainCategoryErrorsEntity, updateSubCategoryErrorsEntity
} from "~/domains/category/entities/categoryEntity";
import {
    isOpenEditModal,
    mainCategoryUpdateForm,
    mainCategoryUpdateErrors,
    subCategoryUpdateForm,
    subCategoryUpdateErrors, isOpenEditMainModal,
} from './variables'

const useEditCategory = () => {
    const store = useCategoryStore();
    const { showSuccess, showError } = useToast()

    const onUpdateMainCategory = async() => {
        await store.updateMainCategory(()=>{
            resetUpdateMainCategoryForm()
            isOpenEditMainModal.value = false

            showSuccess('Main Category updated successfully!')
        }, ()=>showError('Main Category can not updated!'))
    }

    const onUpdateSubCategory = async() => {
        await store.updateSubCategory(()=>{
            resetUpdateSubCategoryForm()
            isOpenEditModal.value = false
            showSuccess('Sub Category updated successfully!')
        }, ()=>showError('Sub Category can not updated!'))
    }

    const resetUpdateMainCategoryForm = () => {
        mainCategoryUpdateForm.value = mainCategoryUpdateFormEntity({})
        mainCategoryUpdateErrors.value = updateMainCategoryErrorsEntity()

    }
    const resetUpdateSubCategoryForm = () => {
        subCategoryUpdateForm.value = subCategoryUpdateFormEntity('', {id:'', name:''})
        subCategoryUpdateErrors.value = updateSubCategoryErrorsEntity()

    }


    return {
        onUpdateMainCategory,
        onUpdateSubCategory
    }
}

export default useEditCategory;