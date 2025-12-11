import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'
import { nanoid } from 'nanoid'
import type { ICommentCreateForm } from "~/domains/comment/types/commentTypes";
import type { IComment } from "~/domains/comment/types/commentTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as ICommentCreateForm

    if (!body.username || !body.text || !body.product_id) {
        return {
            success: false,
            data: {
                errors: {
                    username: !body.username ? ['Username is required'] : [],
                    text: !body.text ? ['Text is required'] : [],
                    product_id: !body.product_id ? ['Product ID is required'] : [],
                    rating: []
                }
            },
            message: "Validation failed",
        }
    }

    if (body.rating < 0 || body.rating > 5) {
        return {
            success: false,
            data: {
                errors: {
                    username: [],
                    text: [],
                    product_id: [],
                    rating: ['Rating must be between 0 and 5']
                }
            },
            message: "Validation failed",
        }
    }

    const id = nanoid()
    const newComment: IComment = {
        id,
        username: body.username,
        text: body.text,
        product_id: body.product_id,
        rating: body.rating || 0,
    }

    await commentRepo.create(newComment)

    return {
        success: true,
        data: newComment,
        message: "success",
    }
})
