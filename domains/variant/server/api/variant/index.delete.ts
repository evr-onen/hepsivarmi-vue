import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    await variantRepo.remove(body.type_id, body.value_id )
    const allVariants = await variantRepo.getAll()
    const index = allVariants.findIndex(variant => variant.id === body.type_id)
        return {
            success: true,
            message: "success",
            data: allVariants[index]
        }

})