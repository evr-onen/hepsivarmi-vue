import useProductStore from '../stores/useProductStore'

const useShowProduct = () => {
    const store = useProductStore();

    const onGetProducts = async() => {
        await store.getProducts()
    }

    const onGetProduct = async(productId: string) => {
        await store.getProduct(productId)
    }

    const onSearchProducts = async(searchValue: string) => {
        await store.searchProducts(searchValue)
    }

    return {
        onGetProducts,
        onGetProduct,
        onSearchProducts,
    }
}

export default useShowProduct;