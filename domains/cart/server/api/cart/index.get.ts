import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async () => {
    const carts: ICart[] = await cartRepo.getAll()

    return {
        success: true,
        data: carts,
        message: "success",
    }
})
