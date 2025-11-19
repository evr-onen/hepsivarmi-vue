import useBrandStore from '../stores/useBrandStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    deleteBrandErrorsEntity,
    deleteBrandFormEntity,
} from "~/domains/brand/entities/brandEntity";
import {
    deleteBrandForm,
    deleteBrandFormErrors,
} from "./variables";

const useDeleteBrand = () => {
    const store = useBrandStore();
    const { showSuccess, showError } = useToast()

    const onDeleteBrand = async() => {
        await store.deleteBrand(()=>{
            resetForm()
            showSuccess('Brand deleted successfully!')
        }, ()=>showError('Brand can not deleted!'))
    }

    const resetForm = () => {
        deleteBrandForm.value = deleteBrandFormEntity({})
        deleteBrandFormErrors.value = deleteBrandErrorsEntity()

    }

    return {
        onDeleteBrand,
    }
}

export default useDeleteBrand;