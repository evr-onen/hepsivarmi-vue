import type { IProduct } from "~/domains/product/types/productTypes";
import type { ICart, ICartCreateForm, ICartDeleteForm, ICartGetFormByUser, ICartQuantityUpdateForm, ICartVariantProduct } from "../types/cartTypes";
import type { IUser } from "~/domains/auth/types/accountTypes"
export const cartEntity = (form:Partial<ICart>): ICart => {
    return structuredClone({
        id      : form.id || "",
        user_id    : form.user_id || "",
        product_id    : form.product_id || "",
        category_id    : form.category_id || "",
        quantity    : form.quantity || 0,
        price    : form.price || 0,
        variant    : form.variant || {
            id: "",
            typeName: "",
            value: "",
            price: 0,
        },
    })
}

// forms
export const cartGetFormByUserEntity = (form:Partial<ICartGetFormByUser>): ICartGetFormByUser => {
    return structuredClone({
        user_id    : form.user_id || "",
    })
}

export const cartCreateFormEntity = (user:Partial<IUser>, productData:Partial<IProduct>, variantData:Partial<ICartVariantProduct>, quantity:number=0): ICartCreateForm => {
    console.log(productData)
    return structuredClone({
        user_id    : user.id || "",
        product_id    : productData.id || "",
        category_id    : productData.subCategory?.id || "",
        quantity    : quantity || 1,
        price    : variantData.price || 0,
        variant    : variantData?.variantValues?.map((variant) => ({
            id: variant.id || "",
            typeName: variant.typeName || "",
            value: variant.name || "",
        }) 
    ) || [ {
        id: "",
        typeName: "",
        value: "",
    }]
}) 
}
export const cartQuantityUpdateFormEntity = (form:Partial<ICartQuantityUpdateForm>): ICartQuantityUpdateForm => {
    return structuredClone({
        id              : form.id || "",
        quantity        : form.quantity || 0,
    })
}
export const cartDeleteFormEntity = (form:Partial<ICartDeleteForm>): ICartDeleteForm => {
    return structuredClone({
        id          : form.id || "",
    })
}

// errors
export const createCartErrorsEntity = (): TErrorBag => {
    return structuredClone({
        user_id      :  [],
        product_id      :  [],
        category_id      :  [],
        quantity      :  [],
        price      :  [],
        variant      :  [],
    })
}
export const cartQuantityUpdateErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id      :  [],
        quantity      :  [],
    })
}

export const deleteCartErrorsEntity = (): TErrorBag => {
    return structuredClone({
        id      :  [],
    })
}



