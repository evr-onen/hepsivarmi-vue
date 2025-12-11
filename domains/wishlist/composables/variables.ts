import {
    wishlistGetFormByUserEntity,
    wishlistCreateFormEntity,
    wishlistUpdateFormEntity,
    wishlistDeleteFormEntity,
    createWishlistErrorsEntity,
    updateWishlistErrorsEntity,
    deleteWishlistErrorsEntity,

} from "../entities/wishlistEntity"
import type { IWishlist, IWishlistCreateForm, IWishlistDeleteForm, IWishlistGetFormByUser, IWishlistUpdateForm } from "../types/wishlistTypes"
import { createInlineAlert } from "~/domains/app/entities/InlineAlertEntity"


export const allWishlistsByUser = ref<IWishlist[]>([])
export const wishlistFormInlineAlert = ref<IInlineMessage>(createInlineAlert());


// forms
export const wishlistGetFormByUser = ref<IWishlistGetFormByUser>(wishlistGetFormByUserEntity({}))
export const wishlistCreateForm = ref<IWishlistCreateForm>(wishlistCreateFormEntity({}))
export const wishlistUpdateForm = ref<IWishlistUpdateForm>(wishlistUpdateFormEntity({}))
export const wishlistDeleteForm = ref<IWishlistDeleteForm>(wishlistDeleteFormEntity({}))

// errors
export const wishlistGetErrors = ref<TErrorBag>({})
export const wishlistCreateErrors = ref<TErrorBag>(createWishlistErrorsEntity());
export const wishlistUpdateErrors = ref<TErrorBag>(updateWishlistErrorsEntity());
export const wishlistDeleteErrors = ref<TErrorBag>(deleteWishlistErrorsEntity());



