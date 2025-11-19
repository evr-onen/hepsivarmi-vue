import useBrandStore from '../stores/useBrandStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {createBrandErrorsEntity, createBrandFormEntity} from "~/domains/brand/entities/brandEntity";
import {
    createBrandForm,
    createBrandFormErrors,
    isOpenCreateBrandModal
} from './variables'

const useCreateBrand = () => {
    const store = useBrandStore();
    const { showSuccess, showError } = useToast()

    const onCreateBrand = async() => {
        await store.createBrand(()=>{
                isOpenCreateBrandModal.value = false
                resetForm()
                showSuccess('Brand created successfully!')
            }, ()=>showError('Brand can not create!')
        )
    }

    const onResetBrand = async() => {
        console.log("Reset Variant")
        await store.resetBrand()
    }

    const resetForm = () => {
        createBrandForm.value = createBrandFormEntity({})
        createBrandFormErrors.value = createBrandErrorsEntity()

    }
    return {
        onCreateBrand,
        onResetBrand,
    }
}

export default useCreateBrand;