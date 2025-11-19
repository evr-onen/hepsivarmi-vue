import usePropertyStore from '../stores/usePropertyStore'
import usePropertyListStore from '../stores/usePropertyListStore'

const useShowProperty = () => {
    const propertyStore = usePropertyStore();
    const propertyLisStore = usePropertyListStore();

    const onGetProperties = async() => {
        await propertyStore.getProperties()
    }

    const onGetPropertyLists = async() => {
        await propertyLisStore.getPropertyLists()
    }

    return {
        onGetProperties,
        onGetPropertyLists,
    }
}

export default useShowProperty;