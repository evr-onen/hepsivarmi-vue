import {
    cartCreateFormEntity,
    cartDeleteFormEntity,
    cartGetFormByUserEntity,
    cartQuantityUpdateFormEntity,
    createCartErrorsEntity,
    deleteCartErrorsEntity,
    cartQuantityUpdateErrorsEntity
} from "../entities/cartEntity"
import type {
    ICart,
    ICartCreateForm,
    ICartDeleteForm,
    ICartGetFormByUser,
    ICartQuantityUpdateForm,
    } from "../types/cartTypes"
import { createInlineAlert } from "~/domains/app/entities/InlineAlertEntity"


export const allCartsByUser = ref<ICart[]>([])
export const cartFormInlineAlert = ref<IInlineMessage>(createInlineAlert());


// forms
export const cartGetFormByUser = ref<ICartGetFormByUser>(cartGetFormByUserEntity({}))
export const cartCreateForm = ref<ICartCreateForm>(cartCreateFormEntity({},{},{},0))
export const cartQuantityUpdateForm = ref<ICartQuantityUpdateForm>(cartQuantityUpdateFormEntity({}))
export const cartDeleteForm = ref<ICartDeleteForm>(cartDeleteFormEntity({}))

// errors
export const cartGetErrors = ref<TErrorBag>({})
export const cartCreateErrors = ref<TErrorBag>(createCartErrorsEntity());
export const cartQuantityUpdateErrors = ref<TErrorBag>(cartQuantityUpdateErrorsEntity());
export const cartDeleteErrors = ref<TErrorBag>(deleteCartErrorsEntity());



