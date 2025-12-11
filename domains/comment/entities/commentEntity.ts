import type { IComment, ICommentCreateForm, ICommentDeleteForm, ICommentGetForm, ICommentGetFormByProduct, ICommentUpdateForm } from "../types/commentTypes";

export const commentEntity = (form:Partial<IComment>): IComment => {
    return structuredClone({
        id      : form.id || "",
        username    : form.username || "",
        text    : form.text || "",
        product_id    : form.product_id || "",
        rating    : form.rating || 0,
    })
}

// forms
export const commentGetFormByProductEntity = (form:Partial<ICommentGetFormByProduct>): ICommentGetFormByProduct => {
    return structuredClone({
        product_id    : form.product_id || "",
    })
}
export const commentGetFormEntity = (form:Partial<ICommentGetForm>): ICommentGetForm => {
    return structuredClone({
        id    : form.id || "",
    })
}

export const commentCreateFormEntity = (form:Partial<ICommentCreateForm>): ICommentCreateForm => {
    return structuredClone({
        username    : form.username || "",
        text    : form.text || "",
        product_id    : form.product_id || "",
        rating    : form.rating || 0,
    })
}
export const commentUpdateFormEntity = (form:Partial<ICommentUpdateForm>): ICommentUpdateForm => {
    return structuredClone({
        id              : form.id || "",
        username        : form.username || "",
        text            : form.text || "",
        product_id      : form.product_id || "",
        rating          : form.rating || 0,
    })
}
export const commentDeleteFormEntity = (form:Partial<ICommentDeleteForm>): ICommentDeleteForm => {
    return structuredClone({
        id          : form.id || "",
    })
}

// errors
export const createCommentErrorsEntity = (): TErrorBag => {
    return structuredClone({
        username      :  [],
        text      :  [],
        product_id      :  [],
        rating      :  [],
    })
}
export const updateCommentErrorsEntity = (): TErrorBag => {
    return structuredClone({
        username      :  [],
        text      :  [],
        product_id      :  [],
        rating      :  [],
    })
}

export const deleteCommentErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id         :  [],
    })
}



