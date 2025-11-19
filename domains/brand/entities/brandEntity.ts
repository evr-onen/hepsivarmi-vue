import type {
    IBrand, IBrandCreateForm, IBrandDeleteForm, IBrandUpdateForm
} from "~/domains/brand/types/brandTypes";

export const brandEntity = (form:IBrand): IBrand => {
    return structuredClone({
        name        : form.name,
        logo        : form.logo,
    })
}

// forms
export const createBrandFormEntity = (form:Partial<IBrandCreateForm>): IBrandCreateForm => {
    return structuredClone({
        name    : form.name || "",
        logo     : form.logo || null
    })
}


export const updateBrandFormEntity = (form:Partial<IBrandUpdateForm>): IBrandUpdateForm => {
    return structuredClone({
        id       : form.id || "",
        name     : form.name || "",
        logo     : form.logo  || null
    })
}



export const deleteBrandFormEntity = (form:Partial<IBrandDeleteForm>): IBrandDeleteForm => {
    return structuredClone({
        id       : form.id || "",
    })
}


// errors
export const createBrandErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
        logo      :  []
    })
}
export const updateBrandErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
        logo      :  []
    })
}
export const deleteBrandErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id           :  [],
    })
}





