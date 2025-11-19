import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useBrandStore from '../stores/useBrandStore'
import {
    updateBrandErrorsEntity,
    updateBrandFormEntity

} from "~/domains/brand/entities/brandEntity";
import {
    isOpenUpdateBrandModal, updateBrandForm, updateBrandFormErrors

} from './variables'

const useUpdateBrand = () => {
    const { showSuccess, showError } = useToast()
    const store = useBrandStore();

    const onUpdateBrand = async() => {
        await store.updateBrand(()=>{
            resetForm()
            isOpenUpdateBrandModal.value = false
            showSuccess('Brand updated successfully!')
        }, ()=>showError('Brand can not updated!'))
    }

    const resetForm = () => {
        updateBrandForm.value = updateBrandFormEntity({})
        updateBrandFormErrors.value = updateBrandErrorsEntity()

    }

    return {
        onUpdateBrand,
    }
}

export default useUpdateBrand;