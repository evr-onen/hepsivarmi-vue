
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useCartStore from '../stores/useCartStore';

const useDeleteCart = () => {
    const store = useCartStore();
    const { showSuccess, showError } = useToast()

    const onDeleteCart = async() => {
        await store.deleteCart(()=>{
            showSuccess('Cart deleted successfully!')
        }, ()=>showError('Cart can not deleted!'))
    }

    return {
        onDeleteCart,
    }
}

export default useDeleteCart;