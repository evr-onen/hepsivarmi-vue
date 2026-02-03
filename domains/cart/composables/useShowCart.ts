import useCartStore from '../stores/useCartStore';

const useShowCart = () => {
    const store = useCartStore();
    const onGetCartsByUser = async() => {
        await store.getCartsByUser()
    }
    
    return {
        onGetCartsByUser,
    }
}

export default useShowCart;