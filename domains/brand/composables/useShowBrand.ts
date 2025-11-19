import useBrandStore from '../stores/useBrandStore'
const useShowBrand = () => {
    const store = useBrandStore();

    const onGetBrands = async() => {
        await store.getBrands()
    }

    return {
        onGetBrands,
    }
}

export default useShowBrand;