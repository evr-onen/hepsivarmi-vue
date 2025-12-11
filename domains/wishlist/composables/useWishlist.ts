import useShowWishlist from './useShowWishlist'
import useCreateWishlist from './useCreateWishlist'
import useDeleteWishlist from './useDeleteWishlist'
import useEditWishlist from './useEditWishlist'

const useWishlist = () => {
    return {
        ...useShowWishlist(),
        ...useCreateWishlist(),
        ...useEditWishlist(),
        ...useDeleteWishlist(),
    }
}

export default useWishlist;