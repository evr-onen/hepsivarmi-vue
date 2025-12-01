
export interface IBrand {
    id                  : string;
    name                : string
    logo                : string
}
export interface IBrandCreateForm {
    name                : string,
    logo                : File[]
}
export interface IBrandUpdateForm {
    id                  : string,
    name                : string,
    logo                : File[]
}
export interface IBrandDeleteForm {
    id                  : string,
}




