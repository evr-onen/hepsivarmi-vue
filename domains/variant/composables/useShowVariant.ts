import useVariantStore from '../stores/useVariantStore'
const useShowVariant = () => {
    const store = useVariantStore();

    const onGetVariants = async() => {
        await store.getVariants()
    }

    return {
        onGetVariants,
    }
}

export default useShowVariant;