import type {
    IPropType,
    IPropTypeCreateForm,
    IPropTypeUpdateForm,
    IPropTypeDeleteForm, IPropTypeValueUpdateForm, IPropTypeValueDeleteForm, IPropTypeValueCreateForm,
} from "~/domains/property/types/propertyTypes";

// prop
export const propertyEntity = (form:Partial<IPropType>): IPropType => {
    return structuredClone({
        id                  : form.id || "",
        name                : form.name || "",
        isFilterItem        : form.isFilterItem || false,
        values              : form.values || []
    })
}
export const propertyCreateFormEntity = (form:Partial<IPropTypeCreateForm>): IPropTypeCreateForm => {
    return structuredClone({
        name       : form.name || "",
        isFilterItem  : form.isFilterItem || false,
    })
}
export const propertyUpdateFormEntity = (form:Partial<IPropTypeUpdateForm>): IPropTypeUpdateForm => {
    return structuredClone({
        id              : form.id || "",
        name            : form.name || "",
        isFilterItem    : form.isFilterItem || false,
        values          : form.values || []
    })
}

export const propertyDeleteFormEntity = (form:Partial<IPropTypeDeleteForm>): IPropTypeDeleteForm => {
    return structuredClone({
        id       : form.id || "",
    })
}

// Value
export const propertyValueCreateFormEntity = (form: Partial<IPropTypeValueCreateForm> ): IPropTypeValueCreateForm => {
    return structuredClone({
        name       : form.name || "",
        prop_id     : form.prop_id || "",
    })
}
export const propertyValueUpdateFormEntity = (form: Partial<IPropTypeValueUpdateForm>): IPropTypeValueUpdateForm => {
    return structuredClone({
        id         : form.id || "",
        name       : form.name || "",
        prop_id     : form.prop_id || "",
    })
}
export const propertyValueDeleteFormEntity = (form:Partial<IPropTypeValueDeleteForm> ): IPropTypeValueDeleteForm => {
    return structuredClone({
        id         : form.id || "",
        prop_id     : form.prop_id || "",
    })
}









