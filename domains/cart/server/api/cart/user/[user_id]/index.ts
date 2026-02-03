import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async (event) => {
    const userId = event.context.params?.user_id as string

    if (!userId) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'User ID is required.' 
        });
    }

    const carts: ICart[] = await cartRepo.getAllByUser(userId)

    return {
        success: true,
        data: carts,
        message: "success",
    }
})

