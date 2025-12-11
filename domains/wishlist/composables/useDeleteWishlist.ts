
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useWishlistStore from '../stores/useWishlistStore';
import { wishlistDeleteForm } from './variables';
import useAuthStore from '~/domains/auth/stores/useAuthStore';

const useDeleteWishlist = () => {
    const {user} = useAuthStore();
    const store = useWishlistStore();
    const { showSuccess, showError } = useToast()

    const onDeleteWishlist = async(productId: string) => {

        if(!user.id) {
            showError('Please login to wishlist!')
            return navigateTo('/auth/login')
        }else{
            wishlistDeleteForm.value.user_id = user.id!
            wishlistDeleteForm.value.product_id = productId!
           await store.deleteWishlist(()=>{
            showSuccess('Wishlist deleted successfully!')
        }, ()=>showError('Wishlist can not deleted!'))
        }

        
    }

    

    return {
        onDeleteWishlist,
    }
}

export default useDeleteWishlist;