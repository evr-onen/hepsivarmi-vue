import type { IVariant } from "~/domains/variant/types/variantTypes"
import type { IMainCategory } from "~/domains/category/types/categoryTypes"
export interface IProduct {
    id                : string
    name              : string
    mainCategory      : IMainCategory
    subCategory       : Record<string, string>
    brand             : Record<string, string>
    variantTypes      : IVariant[]
    variantProducts   : IVariantProduct[]
    images            : string[]
    properties        : IProductProperty
}

export interface IVariantProduct{
    variantValues       : IVariantValues[],
    price               : string,
    isDefault           : boolean,
}


export interface IVariantValues{
    typeName    : string,
    id          : string,
    name        : string
}

export interface IProductProperty{
    propertyList             : IPropertyList,
    productPropertyValues    : IProductPropertyValue[],
}
export interface IPropertyList{
    id                  : string,
    name                : string,
    props               : IPropertyType[],
}
export interface IPropertyType {
    id                  : string,
    name                : string,
    values              : IPropertyValue[],
    isFilterItem        : boolean,
}

export interface IPropertyValue {
    id                  : string,
    name                : string,
}
export interface IProductPropertyValue {
    id                  : string,
    type_id            ?: string,
    name                : string,
}

export interface IImageUpload{
    base64: string
    name: string
    mime: string
    size: number
}

export interface IProductCreateForm{
    name              : string
    mainCategory      : Record<string, string>
    subCategory       : Record<string, string>
    brand             : Record<string, string>
    variantTypes      : IVariant[]
    variantProducts   : IVariantProduct[]
    images            : any[]
    properties        : IProductProperty
}

export interface IProductUpdateForm{
    id                : string
    name              : string
    mainCategory      : Record<string, string>
    subCategory       : Record<string, string>
    brand             : Record<string, string>
    variantTypes      : IVariant[]
    variantProducts   : IVariantProduct[]
    images            : any[]
    properties        : IProductProperty
}
export interface IProductDeleteForm{
    id                : string
}
