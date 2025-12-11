import type {
    ICompare, ICompareCookie, ICompareCreateForm, ICompareDeleteForm
} from "../types/compareTypes";

export const compareEntity = (form:Partial<ICompare>): ICompare => {
    return structuredClone({
        id          : form.id || "",
        user_id     : form.user_id || "",
        products    : form.products || [],
    })
}

// forms
export const createCompareFormEntity = (form:Partial<ICompareCreateForm>): ICompareCreateForm => {
    return structuredClone({
        user_id     : form.user_id || "",
        product_id  : form.product_id || "",
    })
}

export const deleteCompareFormEntity = (form:Partial<ICompareDeleteForm>): ICompareDeleteForm => {
    return structuredClone({
        user_id     : form.user_id || "",
        product_id  : form.product_id || "",
    })
}


export const compareCookieEntity = (form:Partial<ICompareCookie>): ICompareCookie => {
    return structuredClone({
        products    : form.products || [],
    })
}





