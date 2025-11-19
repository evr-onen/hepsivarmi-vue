import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const allVariants = await variantRepo.getAll()
    const id = nanoid()

    if (body.type_id){
        const variantIndex =  allVariants.findIndex((variantItem) => variantItem.id === body.type_id)
        const sameName = allVariants[variantIndex].values.some(valueItem => valueItem.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                type_id: body.type_id,
                name: body.name,
            },
            message: "Already have this variant Value",
        }

        await variantRepo.add(id, body.name, allVariants[variantIndex].id)
        const newVariants = await variantRepo.getAll()

        return {
            success: true,
            message: "success",
            data: newVariants[variantIndex]
        }
    }else{
        const sameName = allVariants.some(TypeItem => TypeItem.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                parent_id: body.parent_id,
                name: body.name,
            },
            message: "Already have this variant Value",
        }

        await variantRepo.add(id, body.name)

        const newVariants = await variantRepo.getAll()
        const variantIndex =  newVariants.findIndex((variantItem) => variantItem.id === body.id)

        return {
            success: true,
            message: "success",
            data: newVariants[variantIndex],
        }
    }


        return {
            success: true,
            message: "success",
            log: {
                body: allVariants,
                allVariants: allVariants,
                variantIndex: allVariants[variantIndex],
            }
        }

})