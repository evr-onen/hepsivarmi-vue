import useVariantStore from '../stores/useVariantStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import type {IVariantTypeDeleteForm} from "~/domains/variant/types/variantTypes";
import {
    isOpenEditModal,
    isOpenVariantValueCreateModal,
    isOpenVariantValueEditModal, variantUpdateForm
} from "~/domains/variant/composables/variables";

const useDeleteVariant = () => {
    const store = useVariantStore();
    const { showSuccess, showError } = useToast()

    const onDeleteVariantType = async(deleteVariant:IVariantTypeDeleteForm) => {
        await store.deleteVariantType(deleteVariant ,()=>{
            showSuccess('All Variant deleted successfully!')
        }, ()=>showError('Variant can not deleted!'))
    }

    const onDeleteVariantValue = async(type_id: string, value_id:string) => {
        await store.deleteVariantValue({type_id, value_id}  ,(response)=>{
            console.log(response)
            variantUpdateForm.value = response.data
            showSuccess('Variant deleted successfully!')

            isOpenVariantValueEditModal.value = false
        }, ()=>showError('Variant can not deleted!'))
    }

    return {
        onDeleteVariantType,
        onDeleteVariantValue,
    }
}

export default useDeleteVariant;