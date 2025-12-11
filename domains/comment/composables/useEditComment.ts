import useCommentStore from '../stores/useCommentStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import {
    commentUpdateFormEntity,
    commentUpdateErrors,
} from '../entities/commentEntity';
import {
    commentUpdateForm,
} from './variables'

const useEditComment = () => {
    const store = useCommentStore();
    const { showSuccess, showError } = useToast()

    const onUpdateComment = async() => {
        await store.updateComment((response)=>{
            resetUpdateCommentForm()

            showSuccess('Main Category updated successfully!')
        }, ()=>showError('Main Category can not updated!'))
    }

    const resetUpdateCommentForm = () => {
        commentUpdateForm.value = commentUpdateFormEntity({})
        commentUpdateErrors.value = {}

    }

    return {
        onUpdateComment,
        resetUpdateCommentForm
    }
}

export default useEditComment;