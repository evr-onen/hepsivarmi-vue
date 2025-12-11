
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import useCommentStore from '../stores/useCommentStore';
import type { ICommentDeleteForm } from '../types/commentTypes';

const useDeleteComment = () => {
    const store = useCommentStore();
    const { showSuccess, showError } = useToast()

    const onDeleteComment = async() => {
        await store.deleteComment((response)=>{
            showSuccess('Comment deleted successfully!')
        }, ()=>showError('Comment can not deleted!'))
    }

    return {
        onDeleteComment,
    }
}

export default useDeleteComment;