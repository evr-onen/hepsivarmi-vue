import usePropertyStore from '../stores/usePropertyStore'
import usePropertyListStore from '../stores/usePropertyListStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'

const useDeleteProperty = () => {
    const propertyStore = usePropertyStore();
    const propertyListStore = usePropertyListStore();

    const { showSuccess, showError } = useToast()

    const onDeletePropertyType = async() => {
        await propertyStore.deletePropertyType(()=>{
            showSuccess('Property deleted successfully!')
        }, ()=>showError('Property can not deleted!'))
    }

    const onDeletePropertyList = async() => {
        await propertyListStore.deletePropertyList(()=>{
            showSuccess('Property List deleted successfully!')
        }, ()=>showError('Property List can not deleted!'))
    }

    const onDeletePropertyValue = async() => {
        await propertyStore.deletePropertyValue(()=>{
            showSuccess('Property Value deleted successfully!')
        }, ()=>showError('Sub Category can not deleted!'))
    }

    return {
        onDeletePropertyType,
        onDeletePropertyValue,
        onDeletePropertyList
    }
}

export default useDeleteProperty;