import { propertyListRepo } from '~/domains/property/infrastructure/propertyListStorage'
import type {
    IPropertyList,
    IPropertyListCreateForm,
} from "~/domains/property/types/propertyListTypes";
import {nanoid} from "nanoid";

const {getAll, add} = propertyListRepo

export default defineEventHandler(async (event) => {
    const body:Partial<IPropertyListCreateForm> = await readBody(event)
    const allItems:IPropertyList[] = await getAll()
    const id = nanoid()
    const {name, list_id} = body

    if (list_id){
        // add prop
        const index = allItems.findIndex((item) => item.id === list_id)
        const sameName = allItems[index].props.some((item) => item.name === name)

        if(sameName) return {
            success: false,
            data: {
                name,
                list_id,
            },
            message: "Already have this  subcategory!!",
        }

        await add(id, name!, list_id)
    }else{
        const sameName = allItems.some(mainItem => mainItem.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                name: name,
            },
            message: "Already have this variant Value",
        }

        await add(id, name!)
    }

        return {
            success: true,
            message: "success",
            log: {
                body: allItems,
            }
        }

})