import useProductStore from '../stores/useProductStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    createProductForm,
    isOpenCreateProductModal
} from "~/domains/product/composables/variables";
import {
    createProductFormEntity
} from "~/domains/product/entities/productEntity";

const useCreateProduct = () => {
    const store = useProductStore();
    const { showSuccess, showError } = useToast()

    const onCreateProduct = async() => {
        await store.createProduct( ()=>{
                isOpenCreateProductModal.value = false
                createProductForm.value = createProductFormEntity({})
                showSuccess('Product created successfully!')
            }, ()=>showError('Product can not create!')
        )
    }

    const onResetProducts = async() => {
        console.log("Reset")
        await store.resetProducts()
    }

    return {
        onCreateProduct,
        onResetProducts,
    }
}

export default useCreateProduct;