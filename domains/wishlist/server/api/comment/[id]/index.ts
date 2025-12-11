import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'
import type { IComment } from "~/domains/comment/types/commentTypes";

export default defineEventHandler(async (event) => {
    const commentId = event.context.params?.id as string

    if (!commentId) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'Comment ID is required.' 
        });
    }

    const comment: IComment | null = await commentRepo.getById(commentId)
    
    if (!comment) {
        throw createError({ 
            statusCode: 404, 
            statusMessage: 'Not Found', 
            message: `Comment with ID ${commentId} not found.` 
        });
    }

    return {
        success: true,
        data: comment,
        message: "success",
    }
})

