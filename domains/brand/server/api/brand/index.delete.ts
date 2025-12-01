import { brandRepo } from '~/domains/brand/infrastructure/brandStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

        await brandRepo.remove(body.id )

        return {
            success: true,
            message: "success"
        }

})