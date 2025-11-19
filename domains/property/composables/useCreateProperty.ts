import usePropertyStore from '../stores/usePropertyStore'
import usePropertyListStore from '../stores/usePropertyListStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    isOpenCreatePropTypeModal,
    isOpenCreatePropTypeValueModal,
    propertyListCreateForm
} from "~/domains/property/composables/variables";
import {propertyListCreateFormEntity} from "~/domains/property/entities/propertyListEntity";

const useCreateProperty = () => {
    const propStore = usePropertyStore();
    const propertyListStore = usePropertyListStore();
    const { showSuccess, showError } = useToast()

    const onCreatePropertyList = async() => {
        await propertyListStore.createPropertyList( ()=>{
                isOpenCreateModal.value = false
                propertyListCreateForm.value = propertyListCreateFormEntity({})
                showSuccess('Property List created successfully!')
            }, ()=>showError('Sub Category can not create!')
        )
    }
    const onCreateProperty = async() => {
        await propStore.createPropertyType( ()=>{
                isOpenCreatePropTypeModal.value = false
                showSuccess('Property created successfully!')
            }, ()=>showError('Property can not create!')
        )
    }
    const onCreatePropertyValue = async() => {
        await propStore.createPropertyValue(()=>{

                isOpenCreatePropTypeValueModal.value = false
                showSuccess('Property Value created successfully!')
            }, ()=>showError('Property can not create!')
        )
    }

    const onResetPropertyLists = async() => {
        console.log("Reset")
        await propertyListStore.resetPropertyList()
    }

    const onResetProperties = async() => {
        console.log("Reset")
        await propStore.resetProperties()
    }

    return {
        onCreatePropertyList,
        onCreateProperty,
        onCreatePropertyValue,
        onResetProperties,
        onResetPropertyLists,
    }
}

export default useCreateProperty;