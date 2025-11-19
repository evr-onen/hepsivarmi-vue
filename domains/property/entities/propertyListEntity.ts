import type {
        IPropertyList,
        IPropertyListCreateForm,
        IPropertyListUpdateForm,
        IPropertyListDeleteForm
} from "~/domains/property/types/propertyListTypes";

export const propertyEntity = (form:Partial<IPropertyList>): IPropertyList => {
    return structuredClone({
        id      : form.id || "",
        name    : form.name || "",
        props   : form.props || []
    })
}
export const propertyListCreateFormEntity = (form:Partial<IPropertyListCreateForm>): IPropertyListCreateForm => {
    return structuredClone({
        name       : form.name || "",
        props      : form.props || [],
    })
}

export const propertyListUpdateFormEntity = (form:Partial<IPropertyListUpdateForm>): IPropertyListUpdateForm => {
    return structuredClone({
        id         : form.id || "",
        name       : form.name || "",
        props       : form.props || []
    })
}


export const propertyListDeleteFormEntity = (form:Partial<IPropertyListDeleteForm>): IPropertyListDeleteForm => {
    return structuredClone({
        id         : form.id || "",
    })
}





