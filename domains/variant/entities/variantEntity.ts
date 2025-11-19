import type {
    IVariant,
    IVariantTypeCreateForm,
    IVariantTypeDeleteForm,
    IVariantTypeUpdateForm, IVariantUpdateForm,
    IVariantValueCreateForm,
    IVariantValueDeleteForm,
    IVariantValueUpdateForm,
    VariantValue,
} from "~/domains/variant/types/variantTypes";

export const createVariantEntity = (form:Partial<IVariant>): IVariant => {
    return structuredClone({
        id      : form.id || "",
        name    : form.name || "",
        values  : form.values || []
    })
}

// type
export const createVariantTypeEntity = (form:Partial<IVariantTypeCreateForm>): IVariantTypeCreateForm => {
    return structuredClone({
        name    : form.name || "",
    })
}
export const createVariantTypeErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
    })
}
// Value
export const createVariantValueEntity = (form:Partial<IVariantValueCreateForm>): IVariantValueCreateForm => {
    return structuredClone({
        type_id : form.type_id || "",
        name    : form.name || "",
    })
}

export const createVariantValueErrorsEntity = (): TErrorBag => {
    return structuredClone({
        type_id             :  [],
        name                :  [],
    })
}
export const updateVariantTypeEntity = (form:Partial<IVariantTypeUpdateForm>): IVariantTypeUpdateForm => {
    return structuredClone({
        id       : form.id || "",
        name     : form.name || "",
    })
}
export const variantTypeDeleteFormEntity = (form:Partial<IVariantTypeDeleteForm>): IVariantTypeDeleteForm => {
    return structuredClone({
        type_id       : form.type_id || "",
    })
}
export const variantValueDeleteFormEntity = (form:Partial<IVariantValueDeleteForm>): IVariantValueDeleteForm => {
    return structuredClone({
        type_id       : form.type_id || "",
        value_id       : form.value_id || "",
    })
}
export const updateVariantValueEntity = (type_id:string, itemValue:VariantValue): IVariantValueUpdateForm => {
    return structuredClone({
        id          : itemValue.id || "",
        type_id     : type_id || "",
        name        : itemValue.name || "",
    })
}
export const updateVariantTypeErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name         :  [],
    })
}

export const updateVariantValueErrorsEntity = (): TErrorBag => {
    return structuredClone({
        type_id    :  [],
        name         :  [],
    })
}
export const deleteVariantErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id           :  [],
    })
}
export const variantUpdateFormEntity =(form:Partial<IVariant>): IVariantUpdateForm =>{
    return structuredClone({
        id          : form.id || '',
        name        : form.name || '',
        values      :  form.values || [],
    })
}




