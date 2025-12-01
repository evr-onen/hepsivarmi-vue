import useProductStore from '../stores/useProductStore'

const useShowProduct = () => {
    const store = useProductStore();

    const onGetProducts = async() => {
        await store.getProducts()
    }

    return {
        onGetProducts,
    }
}

export default useShowProduct;