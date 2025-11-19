
export interface ICategory {
    id                     : string,
    name                   : string
    subs                   : ISubCategory[]
}
export interface ISubCategory {
    id                     : string,
    name                   : string
}



// main Category
export interface IMainCategoryCreateForm {
    name              : string,
}
export interface IMainCategoryUpdateForm {
    id                     : string,
    name                    : string
}

export interface IMainCategoryDeleteForm {
    main_id                : string
}


// Sub Category
export interface ISubCategoryCreateForm {
    main_id                 : string,
    name                    : string
}
export interface ISubCategoryUpdateForm {
    id                      : string,
    name                    : string
    main_id                 : string
}
export interface ISubCategoryDeleteForm {
    main_id                : string
    sub_id                 : string
}



