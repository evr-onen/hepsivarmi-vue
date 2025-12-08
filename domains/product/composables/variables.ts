import {createInlineAlert} from "~/domains/app/entities/InlineAlertEntity";
import {
    createProductErrorsEntity,
    createProductFormEntity,
    deleteProductErrorsEntity, deleteProductFormEntity, ProductEntity, updateProductErrorsEntity, updateProductFormEntity,
} from "~/domains/product/entities/productEntity";

import type {
    IProduct,
    IProductCreateForm,
    IProductDeleteForm,
    IProductUpdateForm
} from "~/domains/product/types/productTypes";

// modals
export const isOpenCreateProductModal = ref<boolean>(false)
export const isOpenEditProductModal = ref<boolean>(false)

export const allProducts = ref<IProduct[]>([])
export const imagePath = ref<string>()
export const productFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

// forms
export const createProductForm = ref<IProductCreateForm>(createProductFormEntity({}))
export const updateProductForm = ref<IProductUpdateForm>(updateProductFormEntity({}))
export const deleteProductForm = ref<IProductDeleteForm>(deleteProductFormEntity({}))

// errors
export const getProductErrors = ref<TErrorBag>({})
export const createProductFormErrors = ref<TErrorBag>(createProductErrorsEntity())
export const updateProductFormErrors = ref<TErrorBag>(updateProductErrorsEntity())
export const deleteProductFormErrors = ref<TErrorBag>(deleteProductErrorsEntity())

// single product
export const singleProduct = ref<IProduct>(ProductEntity({} as IProduct))

