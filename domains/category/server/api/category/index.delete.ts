import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

        await categoryRepo.remove(body.main_id, body.sub_id )

        return {
            success: true,
            message: "success"
        }

})