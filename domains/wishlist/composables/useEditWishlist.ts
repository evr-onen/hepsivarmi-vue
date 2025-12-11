
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    wishlistUpdateFormEntity,
    updateWishlistErrorsEntity,
} from '../entities/wishlistEntity';
import {
    wishlistUpdateForm,
    wishlistUpdateErrors,
} from './variables'
import useWishlistStore from '../stores/useWishlistStore';

const useEditWishlist = () => {
    const store = useWishlistStore();
    const { showSuccess, showError } = useToast()

    const onUpdateWishlist = async() => {
        await store.updateWishlist((response)=>{
            resetUpdateWishlistForm()

            showSuccess('Main Category updated successfully!')
        }, ()=>showError('Main Category can not updated!'))
    }

    const resetUpdateWishlistForm = () => {
        wishlistUpdateForm.value = wishlistUpdateFormEntity({})
        wishlistUpdateErrors.value = updateWishlistErrorsEntity()

    }

    return {
        onUpdateWishlist,
        resetUpdateWishlistForm
    }
}

export default useEditWishlist;