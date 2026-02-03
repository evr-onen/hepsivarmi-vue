import useShowCart from './useShowCart'
import useCreateCart from './useCreateCart'
import useDeleteCart from './useDeleteCart'
import useEditCart from './useEditCart'

const useCart = () => {
    return {
        ...useShowCart(),
        ...useCreateCart(),
        ...useEditCart(),
        ...useDeleteCart(),
    }
}

export default useCart;