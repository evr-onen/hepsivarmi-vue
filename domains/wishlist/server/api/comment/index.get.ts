import { commentRepo } from '~/domains/comment/infrastructure/commentStorage'
import type { IComment } from "~/domains/comment/types/commentTypes";

export default defineEventHandler(async () => {
    const comments: IComment[] = await commentRepo.getAll()

    return {
        success: true,
        data: comments,
        message: "success",
    }
})
