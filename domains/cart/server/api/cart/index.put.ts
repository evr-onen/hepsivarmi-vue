import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import type { ICartQuantityUpdateForm } from "~/domains/cart/types/cartTypes";
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as ICartQuantityUpdateForm

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

    if (!body.quantity || body.quantity <= 0) {
        return {
            success: false,
            data: {
                errors: {
                    id: [],
                    quantity: ['Quantity must be greater than 0']
                }
            },
            message: "Validation failed",
        }
    }

    const updatedCart: ICart = {
        ...existingCart,
        quantity: body.quantity,
    }

    await cartRepo.update(updatedCart)

    return {
        success: true,
        data: updatedCart,
        message: "success",
    }
})
