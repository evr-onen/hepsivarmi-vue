import useVariantStore from '../stores/useVariantStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {createVariantTypeEntity, createVariantValueEntity} from "~/domains/variant/entities/variantEntity";
import {
    isOpenVariantTypeModal,
    isOpenCreateModal,
    variantTypeCreateForm,
    variantValueCreateForm,
    variantTypeCreateErrors,
    variantValueCreateErrors,
    variantType, isOpenVariantValueCreateModal,
} from './variables'

const useCreateVariant = () => {
    const store = useVariantStore();
    const { showSuccess, showError } = useToast()

    const onCreateVariantType = async() => {
        await store.createVariantType((response)=>{
                isOpenVariantTypeModal.value = false
                resetVariantTypeForm()
                if(isOpenCreateModal.value) variantType.value = response.data
                showSuccess('Variant type created successfully!')
            }, ()=>showError('Variant type can not create!')
        )
    }

    const onCreateVariantValue = async() => {
        await store.createVariantValue( (response)=>{
                variantUpdateForm.value = structuredClone(response.data)
                isOpenVariantValueCreateModal.value = false
                resetVariantForm()
                resetVariantTypeForm()
                showSuccess('Variant Value created successfully!')
            }, ()=>showError('Variant can not create!')
        )
    }

    const onResetVariant = async() => {
        console.log("Reset Variant")
        await store.resetVariants()
    }

    const resetVariantForm = () => {
        variantValueCreateForm.value = createVariantValueEntity({})
        variantValueCreateErrors.value = {}

    }
    const resetVariantTypeForm = () => {
        variantTypeCreateForm.value = createVariantTypeEntity({})
        variantTypeCreateErrors.value = {}
    }
    return {
        onCreateVariantType,
        onCreateVariantValue,
        onResetVariant,
    }
}

export default useCreateVariant;