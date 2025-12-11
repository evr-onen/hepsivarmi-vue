import useCommentStore from '../stores/useWishlistStore'
const useShowWishlist = () => {
    const store = useCommentStore();

    const onGetWishlistsByUser = async() => {
        await store.getWishlistsByUser()
    }
    
    return {
        onGetWishlistsByUser,
    }
}

export default useShowWishlist;