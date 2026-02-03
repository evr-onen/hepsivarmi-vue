import type { IVariantValues } from "~/domains/product/types/productTypes"

export interface ICart {
    id                       : string,
    user_id                  : string,
    product_id               : string,
    category_id              : string,
    quantity                 : number,
    price                    : number,
    variant                  : IVariantProduct
}

export interface IVariantProduct{
    id                       : string,
    typeName                 : string,
    value                    : string,
}




// actions
export interface ICartCreateForm {
    user_id                  : string,
    product_id               : string,
    category_id              : string,
    quantity                 : number,
    price                    : number,
    variant                  : IVariantProduct[]
}
export interface ICartQuantityUpdateForm {
    id                     : string,
    quantity               : number,
}

export interface ICartDeleteForm {
    id                     : string
}

export interface ICartGetFormByUser {
    user_id                : string
}

export interface ICartVariantProduct {
    isDefault           : boolean,
    price               : number,
    variantValues       : IVariantValues[]
}