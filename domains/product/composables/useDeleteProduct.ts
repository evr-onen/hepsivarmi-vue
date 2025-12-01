import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useProductStore from '../stores/useProductStore'
import {deleteProductForm, deleteProductFormErrors} from "~/domains/product/composables/variables";
import {deleteProductErrorsEntity, deleteProductFormEntity} from "~/domains/product/entities/productEntity";

const useDeleteProduct = () => {
    const store = useProductStore();
    const { showSuccess, showError } = useToast()

    const onDeleteProduct = async() => {
        await store.deleteProduct(()=>{
            resetDeleteForm()
            showSuccess('Property deleted successfully!')
        }, ()=>showError('Property can not deleted!'))
    }

    const resetDeleteForm = ()=>{
        deleteProductForm.value = deleteProductFormEntity({})
        deleteProductFormErrors.value = deleteProductErrorsEntity()
    }
    return {
        onDeleteProduct,
    }
}

export default useDeleteProduct;