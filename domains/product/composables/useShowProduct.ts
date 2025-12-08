import useProductStore from '../stores/useProductStore'

const useShowProduct = () => {
    const store = useProductStore();

    const onGetProducts = async() => {
        await store.getProducts()
    }

    const onGetProduct = async(productId: string) => {
        await store.getProduct(productId)
    }

    return {
        onGetProducts,
        onGetProduct
    }
}

export default useShowProduct;