import {
    commentCreateFormEntity,
    commentUpdateFormEntity,
    commentDeleteFormEntity,
    createCommentErrorsEntity,
    updateCommentErrorsEntity,
    deleteCommentErrorsEntity,
    commentGetFormByProductEntity,
    commentGetFormEntity,
} from "../entities/commentEntity"
import type { IComment, ICommentCreateForm, ICommentDeleteForm, ICommentGetForm, ICommentGetFormByProduct, ICommentUpdateForm } from "../types/commentTypes"
import { createInlineAlert } from "~/domains/app/entities/InlineAlertEntity"


export const allCommentsByProduct = ref<IComment[]>([])
export const commentFormInlineAlert = ref<IInlineMessage>(createInlineAlert());


// forms
export const commentGetFormByProduct = ref<ICommentGetFormByProduct>(commentGetFormByProductEntity({}))
export const commentGetForm = ref<ICommentGetForm>(commentGetFormEntity({}))
export const commentCreateForm = ref<ICommentCreateForm>(commentCreateFormEntity({}))
export const commentUpdateForm = ref<ICommentUpdateForm>(commentUpdateFormEntity({}))
export const commentDeleteForm = ref<ICommentDeleteForm>(commentDeleteFormEntity({}))

// errors
export const commentGetErrors = ref<TErrorBag>({})
export const commentCreateErrors = ref<TErrorBag>(createCommentErrorsEntity());
export const commentUpdateErrors = ref<TErrorBag>(updateCommentErrorsEntity());
export const commentDeleteErrors = ref<TErrorBag>(deleteCommentErrorsEntity());



