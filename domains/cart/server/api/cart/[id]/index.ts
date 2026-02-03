import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async (event) => {
    const cartId = event.context.params?.id as string

    if (!cartId) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'Cart ID is required.' 
        });
    }

    const cart: ICart | null = await cartRepo.getById(cartId)
    
    if (!cart) {
        throw createError({ 
            statusCode: 404, 
            statusMessage: 'Not Found', 
            message: `Cart with ID ${cartId} not found.` 
        });
    }

    return {
        success: true,
        data: cart,
        message: "success",
    }
})

