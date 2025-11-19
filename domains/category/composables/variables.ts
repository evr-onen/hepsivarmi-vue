import {
    mainCategoryCreateFormEntity,
    subCategoryCreateFormEntity,
    mainCategoryUpdateFormEntity,
    subCategoryUpdateFormEntity,

    createMainCategoryErrorsEntity,
    createSubCategoryErrorsEntity,
    updateMainCategoryErrorsEntity,
    updateSubCategoryErrorsEntity,
    deleteCategoryErrorsEntity,
} from "~/domains/category/entities/categoryEntity";
import {createInlineAlert} from "~/domains/app/entities/InlineAlertEntity";

import type {
    ICategory,
    IMainCategoryCreateForm,
    IMainCategoryUpdateForm,
    ISubCategoryCreateForm,
    ISubCategoryUpdateForm,
} from "~/domains/category/types/categoryTypes";


export const isOpenMainCategoryModal = ref<boolean>(false)
export const isOpenCreateModal = ref<boolean>(false)
export const isOpenEditModal = ref<boolean>(false)
export const isOpenEditMainModal = ref<boolean>(false)

export const allCategories = ref<ICategory[]>([])
export const subCategoryFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

export const mainCategory = ref<ICategory | null>(null)

// variantType
export const mainCategoryCreateForm = ref<IMainCategoryCreateForm>(mainCategoryCreateFormEntity({}))
export const mainCategoryUpdateForm = ref<IMainCategoryUpdateForm>(mainCategoryUpdateFormEntity({}))
export const mainCategoryCreateErrors = ref<TErrorBag>(createMainCategoryErrorsEntity());
export const mainCategoryUpdateErrors = ref<TErrorBag>(updateMainCategoryErrorsEntity());
export const mainCategoryDeleteErrors = ref<TErrorBag>(deleteCategoryErrorsEntity());
export const mainCategoryFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

// VariantValue
export const subCategoryCreateForm = ref<ISubCategoryCreateForm>(subCategoryCreateFormEntity({}))
export const subCategoryUpdateForm = ref<ISubCategoryUpdateForm>(subCategoryUpdateFormEntity('', {id:'', name: ''}))
export const subCategoryCreateErrors = ref<TErrorBag>(createSubCategoryErrorsEntity());
export const subCategoryUpdateErrors = ref<TErrorBag>(updateSubCategoryErrorsEntity());
export const subCategoryDeleteErrors = ref<TErrorBag>(deleteCategoryErrorsEntity());
export const categoryFormInlineAlert = ref<IInlineMessage>(createInlineAlert({}));


export const categoryGetErrors = ref<TErrorBag>({})


