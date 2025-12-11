import useCommentStore from '../stores/useCommentStore'
import { useToast, } from '~/domains/app/components/message/Toast/useToast'
import { commentCreateFormEntity } from "../entities/commentEntity";
import useAuthStore from '~/domains/auth/stores/useAuthStore';
import {
    commentCreateForm,
    commentCreateErrors,
} from './variables'


const useCreateComment = () => {
    const {user} = useAuthStore();
    const store = useCommentStore();
    const { showSuccess, showError } = useToast()

    const onCreateComment = async() => {
        console.log(user);
        if(!user.name) {
            showError('Please login to comment!')
            // return navigateTo('/auth/login')
        }else{
            commentCreateForm.value.username = user.name!
            await store.createComment((response)=>{
                resetCommentForm()
                showSuccess('Comment created successfully!')
            }, ()=>showError('Comment can not create!'));
        }
    }

 

    const resetCommentForm = () => {
        commentCreateForm.value = commentCreateFormEntity({})
        commentCreateErrors.value = {}
    }


    return {
        onCreateComment,
        resetCommentForm,
    }
}

export default useCreateComment;