import { wishlistRepo } from '~/domains/wishlist/infrastructure/wishlistStorage'
import { nanoid } from 'nanoid'
import type { IWishlistCreateForm, IWishlist } from "~/domains/wishlist/types/wishlistTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as IWishlistCreateForm

    if (!body.user_id || !body.product_id) {
        return {
            success: false,
            data: {
                errors: {
                    user_id: !body.user_id ? ['User ID is required'] : [],
                    product_id: !body.product_id ? ['Product ID is required'] : [],
                }
            },
            message: "Validation failed",
        }
    }

    const id = nanoid()
    const newWishlist: IWishlist = {
        id,
        user_id: body.user_id,
        product_id: body.product_id,
    }

    await wishlistRepo.create(newWishlist)

    return {
        success: true,
        data: newWishlist,
        message: "success",
    }
})
