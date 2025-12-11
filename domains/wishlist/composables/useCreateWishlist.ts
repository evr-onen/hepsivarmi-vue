import useWishlistStore from '../stores/useWishlistStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import { createWishlistErrorsEntity, wishlistCreateFormEntity } from "../entities/wishlistEntity";
import useAuthStore from '~/domains/auth/stores/useAuthStore';
import {
    wishlistCreateForm,
    wishlistCreateErrors,
} from './variables'


const useCreateWishlist = () => {
  
    const {user} = useAuthStore();
    const store = useWishlistStore();
    const { showSuccess, showError } = useToast()

    const onCreateWishlist = async(productId: string) => {
        if(!user.id) {
            showError('Please login to wishlist!')
            // return navigateTo('/auth/login')
        }else{
            wishlistCreateForm.value.user_id = user.id!
            wishlistCreateForm.value.product_id = productId!
            await store.createWishlist((response)=>{
                resetWishlistForm()
                showSuccess('Wishlist created successfully!')
            }, ()=>showError('Wishlist can not create!'));
        }
    }

 

    const resetWishlistForm = () => {
        wishlistCreateForm.value = wishlistCreateFormEntity({})
        wishlistCreateErrors.value = createWishlistErrorsEntity()
    }


    return {
        onCreateWishlist,
        resetWishlistForm,
    }
}

export default useCreateWishlist;