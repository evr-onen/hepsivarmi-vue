import { propertyRepo } from '~/domains/property/infrastructure/propertyStorage'
import type {
    IPropType,
    IPropTypeValue,
} from "~/domains/property/types/propertyTypes";
import {nanoid} from "nanoid";
const { getAll, add} = propertyRepo

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const allItem:IPropType[] = await getAll()
    const id = nanoid()

    if (body.prop_id){
        const index = allItem.findIndex((item) => item.id === body.prop_id)
        const sameName = allItem[index].values.some((item:IPropTypeValue) => item.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                id,
                prop_id: body.prop_id,
                name: body.name,
            },
            message: "Already have this  Property Value!!",
        }

        await add({id, name: body.name!, isFilterItem:allItem[index].isFilterItem, prop_id: body.prop_id!})
    }else{
        const sameName = allItem.some(item => item.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                name: body.name,
            },
            message: "Already have this variant Value",
        }

        await add({id, name: body.name!, isFilterItem: body.isFilterItem})
    }

        return {
            success: true,
            message: "success",
            log: {
                body: allItem,
                allVariants: allItem,
            }
        }

})