import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async () => {
    const resetCarts: ICart[] = []

    await cartRepo.save(resetCarts)

    return {
        success: true,
        data: resetCarts,
        message: "success",
    }
})
