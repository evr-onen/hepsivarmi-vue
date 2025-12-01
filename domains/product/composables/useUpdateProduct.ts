import useProductStore from '../stores/useProductStore'

import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    isOpenEditProductModal,
    updateProductForm,
    updateProductFormErrors
} from './variables'
import {updateProductFormEntity, updateProductErrorsEntity} from "~/domains/product/entities/productEntity";

const useUpdateProduct = () => {
    const store = useProductStore();
    const { showSuccess, showError } = useToast()

    const onUpdateProduct = async() => {
        await store.updateProduct(()=>{
            resetUpdateForm()
            isOpenEditProductModal.value = false
            showSuccess('Product updated successfully!')
        }, ()=>showError('Product can not updated!'))
    }


    const resetUpdateForm = () => {
        updateProductForm.value = updateProductFormEntity({})
        updateProductFormErrors.value = updateProductErrorsEntity()

    }



    return {
        onUpdateProduct,
    }
}

export default useUpdateProduct;