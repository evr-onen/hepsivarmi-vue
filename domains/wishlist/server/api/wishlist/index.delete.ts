import { wishlistRepo } from '~/domains/wishlist/infrastructure/wishlistStorage'
import type { IWishlistDeleteForm } from "~/domains/wishlist/types/wishlistTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as IWishlistDeleteForm

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

    // Find wishlist by user_id and product_id
    const allWishlists = await wishlistRepo.getAllByUser(body.user_id)
    const existingWishlist = allWishlists.find(
        (wishlist) => wishlist.product_id === body.product_id
    )
    
    if (!existingWishlist) {
        return {
            success: false,
            data: {
                errors: {
                    product_id: ['Wishlist not found']
                }
            },
            message: "Wishlist not found",
        }
    }

    await wishlistRepo.remove(existingWishlist.id)

    return {
        success: true,
        message: "success"
    }
})
