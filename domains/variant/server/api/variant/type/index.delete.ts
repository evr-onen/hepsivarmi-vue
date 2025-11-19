import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
        await variantRepo.remove(body.type_id)

        return {
            success: true,
            message: "success"
        }

})