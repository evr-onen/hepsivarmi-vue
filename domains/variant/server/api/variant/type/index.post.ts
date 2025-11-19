import { nanoid } from 'nanoid'

import { variantRepo } from "~/domains/variant/infrastructure/variantStorage";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const allVariants = await variantRepo.getAll()

    const id = nanoid()
    const sameName = allVariants.some(category => category.name === body.name);

    if(sameName){
        return {
            success: true,
            data: {
                id,
                name: body.name,
            },
            message: "Already have this category",
        }
    }

    await variantRepo.add(id,body.name)

    return {
            success: true,
            data: {
                id,
                name: body.name,
            },
            message: "success"
        }

})