import useCategoryStore from '../stores/useCategoryStore'
const useShowCategory = () => {
    const store = useCategoryStore();

    const onGetCategories = async() => {
        await store.getCategories()
    }

    return {
        onGetCategories,
    }
}

export default useShowCategory;