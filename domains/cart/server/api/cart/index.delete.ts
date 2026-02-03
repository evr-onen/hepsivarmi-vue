import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICartDeleteForm } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as ICartDeleteForm

    if (!body.id) {
        return {
            success: false,
            data: {
                errors: {
                    id: ['ID is required']
                }
            },
            message: "Validation failed",
        }
    }

    const existingCart = await cartRepo.getById(body.id)
    
    if (!existingCart) {
        return {
            success: false,
            data: {
                errors: {
                    id: ['Cart not found']
                }
            },
            message: "Cart not found",
        }
    }

    await cartRepo.remove(body.id)

    return {
        success: true,
        message: "success"
    }
})
