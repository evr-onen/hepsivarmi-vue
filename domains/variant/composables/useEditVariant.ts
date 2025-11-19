import useVariantStore from '../stores/useVariantStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {updateVariantTypeEntity, updateVariantValueEntity} from "~/domains/variant/entities/variantEntity";
import {
    variantTypeUpdateForm,
    variantTypeUpdateErrors,
    variantValueUpdateForm,
    variantValueUpdateErrors,
    isOpenVariantValueEditModal,
    isOpenEditModal,
} from './variables'

const useEditVariant = () => {
    const store = useVariantStore();
    const { showSuccess, showError } = useToast()



    const onUpdateVariant = async() => {
        await store.updateVariant(()=>{
            resetUpdateVariantTypeForm()
            isOpenEditModal.value = false
            showSuccess('Variant Type updated successfully!')
        }, ()=>showError('Variant can not updated!'))
    }

    const onUpdateVariantValue = async() => {
        await store.updateVariantValue((response)=>{
            resetUpdateVariantValueForm()
            console.log(response.data.variant)
            variantUpdateForm.value = response.data.variant
            console.log(variantValueUpdateForm.value)
            isOpenVariantValueEditModal.value = false
            showSuccess('Variant updated successfully!')
        }, ()=>showError('Variant can not updated!'))
    }

    const resetUpdateVariantTypeForm = () => {
        variantTypeUpdateForm.value = updateVariantTypeEntity({})
        variantTypeUpdateErrors.value = {}

    }
    const resetUpdateVariantValueForm = () => {
        variantValueUpdateForm.value = updateVariantValueEntity('', {id:'', name:''})
        variantValueUpdateErrors.value = {}

    }


    return {
        onUpdateVariant,
        onUpdateVariantValue
    }
}

export default useEditVariant;