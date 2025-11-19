import {
    createVariantTypeEntity,
    createVariantTypeErrorsEntity,
    createVariantValueEntity,
    createVariantValueErrorsEntity,
    updateVariantTypeEntity,
    updateVariantTypeErrorsEntity,
    updateVariantValueEntity,
    updateVariantValueErrorsEntity,
    deleteVariantErrorsEntity, variantUpdateFormEntity, variantValueDeleteFormEntity,

} from "~/domains/variant/entities/variantEntity";
import {createInlineAlert} from "~/domains/app/entities/InlineAlertEntity";
import type {
    IVariant,
    IVariantTypeCreateForm,
    IVariantTypeUpdateForm, IVariantUpdateForm,
    IVariantValueCreateForm, IVariantValueDeleteForm,
    IVariantValueUpdateForm
} from "~/domains/variant/types/variantTypes";


export const isOpenVariantTypeModal = ref<boolean>(false)
export const isOpenCreateModal = ref<boolean>(false)
export const isOpenEditModal = ref<boolean>(false)
export const isOpenVariantValueModal = ref<boolean>(false)
export const isOpenEditTypeModal = ref<boolean>(false)
export const isOpenVariantValueCreateModal = ref<boolean>(false)
export const isOpenVariantValueEditModal = ref<boolean>(false)

export const allVariants = ref<IVariant[]>([])
export const variantValueFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

export const variantType = ref<IVariant | null>(null)

// variantType
export const variantTypeCreateForm = ref<IVariantTypeCreateForm>(createVariantTypeEntity({}))
export const variantTypeCreateErrors = ref<TErrorBag>(createVariantTypeErrorsEntity());
export const variantTypeUpdateForm = ref<IVariantTypeUpdateForm>(updateVariantTypeEntity({}))
export const variantTypeUpdateErrors = ref<TErrorBag>(updateVariantTypeErrorsEntity());
export const variantTypeDeleteErrors = ref<TErrorBag>(deleteVariantErrorsEntity());
export const variantTypeFormInlineAlert = ref<IInlineMessage>(createInlineAlert());

// VariantValue
export const variantValueCreateForm = ref<IVariantValueCreateForm>(createVariantValueEntity({}))
export const variantValueCreateErrors = ref<TErrorBag>(createVariantValueErrorsEntity());
export const variantValueUpdateForm = ref<IVariantValueUpdateForm>(updateVariantValueEntity('', {id:'', name: ''}))
export const variantValueUpdateErrors = ref<TErrorBag>(updateVariantValueErrorsEntity());
export const variantValueDeleteForm = ref<IVariantValueDeleteForm>(variantValueDeleteFormEntity({}))
export const variantValueDeleteErrors = ref<TErrorBag>(deleteVariantErrorsEntity());
export const variantFormInlineAlert = ref<IInlineMessage>(createInlineAlert({}));

//
export const variantUpdateForm = ref<IVariantUpdateForm>(variantUpdateFormEntity({}))
export const variantGetErrors = ref<TErrorBag>({})
