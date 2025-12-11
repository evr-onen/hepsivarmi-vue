import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'
import type { IComment } from "~/domains/comment/types/commentTypes";

export default defineEventHandler(async (event) => {
    const productId = event.context.params?.product_id as string

    if (!productId) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'Product ID is required.' 
        });
    }

    const comments: IComment[] = await commentRepo.getAllByProduct(productId)

    return {
        success: true,
        data: comments,
        message: "success",
    }
})

