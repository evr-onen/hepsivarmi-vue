import { cartRepo } from '~/domains/cart/infrastructure/cartStorage'
import { nanoid } from 'nanoid'
import type { ICartCreateForm } from "~/domains/cart/types/cartTypes";
import type { ICart } from "~/domains/cart/types/cartTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as ICartCreateForm

    if (!body.user_id || !body.product_id || !body.category_id) {
        return {
            success: false,
            data: {
                errors: {
                    user_id: !body.user_id ? ['User ID is required'] : [],
                    product_id: !body.product_id ? ['Product ID is required'] : [],
                    category_id: !body.category_id ? ['Category ID is required'] : [],
                    quantity: !body.quantity ? ['Quantity is required'] : [],
                    price: !body.price ? ['Price is required'] : [],
                }
            },
            message: "Validation failed",
        }
    }

    if (body.quantity <= 0) {
        return {
            success: false,
            data: {
                errors: {
                    user_id: [],
                    product_id: [],
                    category_id: [],
                    quantity: ['Quantity must be greater than 0'],
                    price: [],
                }
            },
            message: "Validation failed",
        }
    }

    const id = nanoid()
    const newCart: ICart = {
        id,
        user_id: body.user_id,
        product_id: body.product_id,
        category_id: body.category_id,
        quantity: body.quantity,
        price: body.price,
        variant: body.variant,
    }

    await cartRepo.create(newCart)

    return {
        success: true,
        data: newCart,
        message: "success",
    }
})
