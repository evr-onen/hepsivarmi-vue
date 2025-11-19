import { propertyListRepo } from '~/domains/property/infrastructure/propertyListStorage'
import type {IPropertyListPropUpdateForm} from "~/domains/property/types/propertyListTypes";

const { update } = propertyListRepo

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {id, name, props, list_id} = body
    const allItems = await propertyListRepo.getAll()

    const index = allItems.findIndex(item => item.id === list_id)



    if(list_id){
        const sameName =  allItems[index].props.some(item => item.name === name)

        if(sameName) return {
            success: false,
            data: {id, list_id, name},
            message: "Already have this Property list",
        }
        await update({id, name, list_id})

        return {
            success: true,
            data: {
                property_list : allItems[index],
            },
            message: "success",
            log: {
                all: allItems,
                body: body.name
            }
        }
    }else{

        const sameName =  allItems.some(item =>  (item.id !== id) && (item.name === name))
        if(sameName) return {
            success: false,
            data: {id, name, props},
            message: "Already have this property list",
        }

        await update({id, name, props})

        return {
            success: true,
            data: {
                property : allItems[index],
            },
            message: "success",
            log: {
                all: allItems,
                body: body
            }
        }
    }




})