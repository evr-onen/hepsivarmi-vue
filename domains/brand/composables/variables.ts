import {createInlineAlert} from "~/domains/app/entities/InlineAlertEntity";
import {
    createBrandErrorsEntity,
    createBrandFormEntity,
    deleteBrandErrorsEntity, deleteBrandFormEntity, updateBrandErrorsEntity, updateBrandFormEntity
} from "~/domains/brand/entities/brandEntity";

import type {


} from "~/domains/category/types/categoryTypes";
import type {IBrand, IBrandCreateForm, IBrandDeleteForm, IBrandUpdateForm} from "~/domains/brand/types/brandTypes";

// modals
export const isOpenCreateBrandModal = ref<boolean>(false)
export const isOpenUpdateBrandModal = ref<boolean>(false)

export const allBrands = ref<IBrand[]>([])
export const brandFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

// forms
export const createBrandForm = ref<IBrandCreateForm>(createBrandFormEntity({}))
export const updateBrandForm = ref<IBrandUpdateForm>(updateBrandFormEntity({}))
export const deleteBrandForm = ref<IBrandDeleteForm>(deleteBrandFormEntity({}))

// errors
export const getBrandsErrors = ref<TErrorBag>({})
export const createBrandFormErrors = ref<TErrorBag>(createBrandErrorsEntity())
export const updateBrandFormErrors = ref<TErrorBag>(updateBrandErrorsEntity())
export const deleteBrandFormErrors = ref<TErrorBag>(deleteBrandErrorsEntity())


