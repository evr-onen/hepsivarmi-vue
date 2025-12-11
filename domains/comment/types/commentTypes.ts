
export interface IComment {
    id                     : string,
    username                   : string,
    text                     : string,
    product_id               : string,
    rating                   : number
}




// actions
export interface ICommentGetFormByProduct {
    product_id               : string
}
export interface ICommentGetForm {
    id                     : string
}

export interface ICommentCreateForm {
    username                    : string
    text                        : string
    product_id                  : string
    rating                      : number
}
export interface ICommentUpdateForm {
    id                     : string,
    username                   : string,
    text                     : string,
    product_id               : string,
    rating                   : number
}

export interface ICommentDeleteForm {
    id                     : string
}



