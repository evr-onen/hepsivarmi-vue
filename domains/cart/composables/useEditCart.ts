import useCartStore from '../stores/useCartStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    cartQuantityUpdateFormEntity,
    cartQuantityUpdateErrorsEntity
} from '../entities/cartEntity';
import {
    cartQuantityUpdateForm,
} from './variables'

const useEditCart = () => {
    const store = useCartStore();
    const { showSuccess, showError } = useToast()

    const onUpdateCart = async() => {
        await store.updateCartQuantity(()=>{
            resetUpdateCartForm()

            showSuccess('Cart updated successfully!')
        }, ()=>showError('Cart can not updated!'))
    }

    const resetUpdateCartForm = () => {
        cartQuantityUpdateForm.value = cartQuantityUpdateFormEntity({})
        cartQuantityUpdateErrors.value = cartQuantityUpdateErrorsEntity()

    }

    return {
        onUpdateCart,
        resetUpdateCartForm
    }
}

export default useEditCart;