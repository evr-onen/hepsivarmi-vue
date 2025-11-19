
export interface IPropType {
    id                : string,
    name              : string,
    isFilterItem      : boolean,
    values            : IPropTypeValue[],
}

export interface IPropTypeCreateForm{
    name                 : string
    isFilterItem       : boolean,
}

export interface IPropTypeUpdateForm{
    id                  : string,
    name                : string,
    isFilterItem      : boolean,
    values              : IPropTypeValue[],
}



export interface IPropTypeDeleteForm {
    id                : string,
}


// value
export interface IPropTypeValue{
    id                   : string
    name                 : string
}

export interface IPropTypeValueCreateForm {
    name                : string
    prop_id             : string
}
export interface IPropTypeValueUpdateForm {
    id                  : string
    name                : string
    prop_id             : string
}

export interface IPropTypeValueDeleteForm {
    id                : string,
    prop_id           : string,

}
