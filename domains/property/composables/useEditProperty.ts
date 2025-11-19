import usePropertyStore from '../stores/usePropertyStore'
import usePropertyListStore from '../stores/usePropertyListStore'

import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    isOpenEditPropTypeModal,
    isOpenPropertyListEditModal,
    propertyListUpdateErrors,
    propertyListUpdateForm,
    propertyUpdateErrors,
    propertyValueUpdateForm,
    propertyValueUpdateErrors, allProperties, propertyUpdateForm

} from './variables'
import {propertyUpdateFormEntity, propertyValueUpdateFormEntity} from "~/domains/property/entities/propertyEntity";
import {propertyListUpdateFormEntity} from "~/domains/property/entities/propertyListEntity";

const useEditProperty = () => {
    const propertyStore = usePropertyStore();
    const propertyListStore = usePropertyListStore();

    const { showSuccess, showError } = useToast()

    const onUpdatePropertyType = async() => {
        await propertyStore.updatePropertyType(()=>{
            resetPropertyUpdateForm()
            isOpenEditPropTypeModal.value = false
            showSuccess('Property updated successfully!')
        }, ()=>showError('Property can not updated!'))
    }
    const onUpdatePropertyList = async() => {
        await propertyListStore.updatePropertyList(()=>{
            resetPropertyListUpdateForm()
            showSuccess('Property List updated successfully!')
            isOpenPropertyListEditModal.value = false
        }, ()=>showError('Property List can not updated!'))
    }

    const onUpdatePropertyValue = async() => {
        await propertyStore.updatePropertyValue(()=>{
            resetPropertyValueUpdateForm()
            isOpenEditModal.value = false
            showSuccess('Sub Category updated successfully!')
        }, ()=>showError('Sub Category can not updated!'))
    }

    const resetPropertyUpdateForm = () => {
        propertyUpdateForm.value = propertyUpdateFormEntity({})
        propertyUpdateErrors.value = {}

    }
    const resetPropertyListUpdateForm = () => {
        propertyListUpdateForm.value = propertyListUpdateFormEntity({})
        propertyListUpdateErrors.value = {}

    }
    const resetPropertyValueUpdateForm = () => {
        propertyValueUpdateForm.value = propertyValueUpdateFormEntity({})
        propertyValueUpdateErrors.value = {}

    }


    return {
        onUpdatePropertyType,
        onUpdatePropertyValue,
        onUpdatePropertyList
    }
}

export default useEditProperty;