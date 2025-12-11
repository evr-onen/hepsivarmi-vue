
export interface IWishlist {
    id          : string,
    user_id     : string,
    product_id  : string,
}

// actions
export interface IWishlistGetFormByUser {
    user_id               : string
}

export interface IWishlistCreateForm {
    user_id     : string,
    product_id  : string,
}
export interface IWishlistUpdateForm {
    id          : string,
    user_id     : string,
    product_id  : string,
}

export interface IWishlistDeleteForm {
    user_id     : string,
    product_id  : string,
}



