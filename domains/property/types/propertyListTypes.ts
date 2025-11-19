
export interface IPropertyList {
    id                  : string,
    name                : string,
    props              :  IPropertyListProp[]
}

export interface IPropertyListCreateForm{
    name                : string
    props               : IPropertyListProp[]
}

export interface IPropertyListUpdateForm{
    id                  : string,
    name                : string,
    props              :  IPropertyListProp[]
}

export interface IPropertyListPropUpdateForm {
    id                  : string
    name                : string
    props               : string
}

export interface IPropertyListDeleteForm {
    id                : string,
}

export interface IPropertyListPropDeleteForm {
    id                : string,
    list_id           : string,

}
export interface IPropertyListProp{
    id                   : string
    name                 : string
}
