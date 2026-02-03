
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useAuthStore from '~/domains/auth/stores/useAuthStore';
import {
    cartCreateForm,
    cartCreateErrors,
} from './variables'
import useCartStore from '../stores/useCartStore';
import { cartCreateFormEntity } from '../entities/cartEntity';


const useCreateCart = () => {
    const {user} = useAuthStore();
    const store = useCartStore();
    const { showSuccess, showError } = useToast()

    const onCreateCart = async(productId: string | null = null) => {
        console.log(user);
        if(!user.name) {
            showError('Please login for add to cart!')
            return navigateTo('/auth/login')
        }else{
            console.log('asdasd');
            console.log(productId);
            if(productId){
                cartCreateForm.value.user_id = user.id!
                console.log(cartCreateForm.value);
                await store.createCart(()=>{
                    resetCartForm()
                    showSuccess('Cart created successfully!')
                }, ()=>showError('Cart can not create!'));
            }
        }
    }

 

    const resetCartForm = () => {
        cartCreateForm.value = cartCreateFormEntity({},{},{},0)
        cartCreateErrors.value = {}
    }


    return {
        onCreateCart,
        resetCartForm,
    }
}

export default useCreateCart;