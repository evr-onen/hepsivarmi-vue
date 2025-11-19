import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const allVariants = await variantRepo.getAll()
    const sameName = allVariants.some(variant => variant.name === body.name && variant.id !== body.id);

    if(sameName){
        return {
            success: false,
            data: {
                payload: body,
            },
            message: "Already have this Variant",
        }
    }
    const index = allVariants.findIndex(variant=>variant.id === body.id )
    allVariants[index] = body
    await variantRepo.save(allVariants)

        return {
            success: true,
            data: {
                id: body.id,
                parent_id: body.parent_id,
                name: body.name,
            },
            message: "success",
            log: {
                all: allVariants,
                body: body.name
            }
        }

})