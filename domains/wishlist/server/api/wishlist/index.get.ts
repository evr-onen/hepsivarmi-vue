import { wishlistRepo } from '~/domains/wishlist/infrastructure/wishlistStorage'
import type { IWishlist } from "~/domains/wishlist/types/wishlistTypes";

export default defineEventHandler(async () => {
    const wishlists: IWishlist[] = await wishlistRepo.getAll()

    return {
        success: true,
        data: wishlists,
        message: "success",
    }
})
