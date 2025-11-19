
export interface IVariantTypeCreateForm {
    name                : string
}
export interface IVariantValueCreateForm {
    type_id             : string
    name                : string
}

export interface IVariantTypeUpdateForm {
    id                    : string
    name                  : string
}
export interface IVariantValueUpdateForm {
    id                    : string
    type_id               : string
    name                  : string
}

export interface IVariant  {
    id                  : string
    name                : string
    values              : VariantValue[]

}
export interface IVariantTypeDeleteForm {
    type_id                : string
}
export interface IVariantValueDeleteForm {
    type_id                : string
    value_id                 : string
}

export interface VariantValue  {id: string, name: string}

export interface IVariantDeleteForm {
    type_id          ?: string
    id               : string
}

export interface IVariantUpdateForm{
    id                    : string
    name                 : string
    values              : VariantValue[]
}

