import type { IWishlist, IWishlistCreateForm, IWishlistDeleteForm, IWishlistGetFormByUser, IWishlistUpdateForm } from "../types/wishlistTypes";

export const wishlistEntity = (form:Partial<IWishlist>): IWishlist => {
    return structuredClone({
        id      : form.id || "",
        user_id    : form.user_id || "",
        product_id    : form.product_id || "",
    })
}

// forms
export const wishlistGetFormByUserEntity = (form:Partial<IWishlistGetFormByUser>): IWishlistGetFormByUser => {
    return structuredClone({
        user_id    : form.user_id || "",
    })
}

export const wishlistCreateFormEntity = (form:Partial<IWishlistCreateForm>): IWishlistCreateForm => {
    return structuredClone({
        user_id    : form.user_id || "",
        product_id    : form.product_id || "",
    })
}
export const wishlistUpdateFormEntity = (form:Partial<IWishlistUpdateForm>): IWishlistUpdateForm => {
    return structuredClone({
        id              : form.id || "",
        user_id        : form.user_id || "",
        product_id      : form.product_id || "",
    })
}
export const wishlistDeleteFormEntity = (form:Partial<IWishlistDeleteForm>): IWishlistDeleteForm => {
    return structuredClone({
        user_id     : form.user_id || "",
        product_id  : form.product_id || "",
    })
}

// errors
export const createWishlistErrorsEntity = (): TErrorBag => {
    return structuredClone({
        user_id      :  [],
        product_id      :  [],
    })
}
export const updateWishlistErrorsEntity = (): TErrorBag => {
    return structuredClone({
        user_id      :  [],
        product_id      :  [],
    })
}

export const deleteWishlistErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id         :  [],
    })
}



