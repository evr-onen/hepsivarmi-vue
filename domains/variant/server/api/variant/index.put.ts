import { variantRepo } from '~/domains/variant/infrastructure/variantStorage'
import type {IVariantValueUpdateForm} from "~/domains/variant/types/variantTypes";

export default defineEventHandler(async (event) => {
    const body: IVariantValueUpdateForm = await readBody(event)
    const {id, type_id, name} = body

    const allVariants = await variantRepo.getAll()
    const index = allVariants.findIndex(variant => variant.id === type_id)
    const sameName =  allVariants[index].values.some(variant => variant.name === name)

    if(sameName) return {
        success: false,
        data: {
            id: id,
            type_id: type_id,
            name: name,
        },
        message: "Already have this variant Value",
    }
    const valueIndex =  allVariants[index].values.findIndex(value => value.id === id)
    allVariants[index].values[valueIndex].name = name

    await variantRepo.save(allVariants)

        return {
            success: true,
            data: {
                variant : allVariants[index],
            },
            message: "success",
            log: {
                all: allVariants,
                body: body.name
            }
        }

})