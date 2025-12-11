import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

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

    const existingComment = await commentRepo.getById(body.id)
    
    if (!existingComment) {
        return {
            success: false,
            data: {
                errors: {
                    id: ['Comment not found']
                }
            },
            message: "Comment not found",
        }
    }

    await commentRepo.remove(body.id)

    return {
        success: true,
        message: "success"
    }
})
