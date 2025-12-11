import useCommentStore from '../stores/useCommentStore'
const useShowComment = () => {
    const store = useCommentStore();

    const onGetCommentsByProduct = async() => {
        await store.getCommentsByProduct()
    }
    
    const onGetCommentById = async() => {
        await store.getCommentById()
    }
    return {
        onGetCommentsByProduct,
        onGetCommentById,
    }
}

export default useShowComment;