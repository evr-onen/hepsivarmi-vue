
export interface IBrand {
    id                  : string;
    name                : string
    logo                : File
}
export interface IBrandCreateForm {
    name                : string,
    logo                : File | null
}
export interface IBrandUpdateForm {
    id                  : string,
    name                : string,
    logo                : File | null
}
export interface IBrandDeleteForm {
    id                  : string,
}




