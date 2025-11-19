import type {
    ICategory,
    IMainCategoryCreateForm,
    ISubCategoryCreateForm,
    IMainCategoryUpdateForm,
    ISubCategoryUpdateForm,
    IMainCategoryDeleteForm,
    ISubCategoryDeleteForm,
    ISubCategory,
} from "~/domains/category/types/categoryTypes";

export const categoryEntity = (form:Partial<ICategory>): ICategory => {
    return structuredClone({
        id      : form.id || "",
        name    : form.name || "",
        subs    : form.subs || []
    })
}
export const mainCategoryCreateFormEntity = (form:Partial<IMainCategoryCreateForm>): IMainCategoryCreateForm => {
    return structuredClone({
        name    : form.name || "",
    })
}
export const subCategoryCreateFormEntity = (form:Partial<ISubCategoryCreateForm>): ISubCategoryCreateForm => {
    return structuredClone({
        main_id : form.main_id || "",
        name    : form.name || "",
    })
}

export const mainCategoryUpdateFormEntity = (form:Partial<IMainCategoryUpdateForm>): IMainCategoryUpdateForm => {
    return structuredClone({
        id       : form.id || "",
        name     : form.name || "",
    })
}

export const subCategoryUpdateFormEntity = (main_id:string, itemValue:ISubCategory): ISubCategoryUpdateForm => {
    return structuredClone({
        id          : itemValue.id || "",
        main_id     : main_id || "",
        name        : itemValue.name || "",
    })
}

export const mainCategoryDeleteFormEntity = (form:Partial<IMainCategoryDeleteForm>): IMainCategoryDeleteForm => {
    return structuredClone({
        main_id       : form.main_id || "",
    })
}
export const subCategoryDeleteFormEntity = (form:Partial<ISubCategoryDeleteForm>): ISubCategoryDeleteForm => {
    return structuredClone({
        main_id       : form.main_id || "",
        sub_id       : form.sub_id || "",
    })
}


export const createMainCategoryErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name      :  [],
    })
}
export const createSubCategoryErrorsEntity = (): TErrorBag => {
    return structuredClone({
        sub_id             :  [],
        name                :  [],
    })
}

export const updateMainCategoryErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name         :  [],
    })
}

export const updateSubCategoryErrorsEntity = (): TErrorBag => {
    return structuredClone({
        main_id    :  [],
        name         :  [],
    })
}
export const deleteCategoryErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id           :  [],
    })
}





