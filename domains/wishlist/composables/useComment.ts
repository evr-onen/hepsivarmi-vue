import useShowComment from './useShowComment'
import useCreateComment from './useCreateComment'
import useDeleteComment from './useDeleteComment'
import useEditComment from './useEditComment'

const useComment = () => {
    return {
        ...useShowComment(),
        ...useCreateComment(),
        ...useEditComment(),
        ...useDeleteComment(),
    }
}

export default useComment;