import useCategoryStore from '../stores/useCategoryStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import type {IMainCategoryDeleteForm} from "~/domains/category/types/categoryTypes";

const useDeleteCategory = () => {
    const store = useCategoryStore();
    const { showSuccess, showError } = useToast()

    const onDeleteMainCategory = async(deleteCategory:IMainCategoryDeleteForm) => {
        await store.deleteMainCategory(deleteCategory ,()=>{
            showSuccess('All Categories deleted successfully!')
        }, ()=>showError('All Categories can not deleted!'))
    }

    const onDeleteSubCategory = async(main_id: string, sub_id:string) => {
        await store.deleteSubCategory({main_id, sub_id}  ,()=>{
            showSuccess('Sub Category deleted successfully!')
        }, ()=>showError('Sub Category can not deleted!'))
    }

    return {
        onDeleteMainCategory,
        onDeleteSubCategory,
    }
}

export default useDeleteCategory;