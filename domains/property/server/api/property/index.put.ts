import { propertyRepo} from '~/domains/property/infrastructure/propertyStorage'
import type {
    IPropType,
} from "~/domains/property/types/propertyTypes";

const { getAll, update} = propertyRepo

export default defineEventHandler(async (event) => {
    const body= await readBody(event)
    const {id, name, prop_id, isFilterItem} = body
    const allItems = await getAll()

    if(prop_id){
    const index = allItems.findIndex((item:IPropType) => item.id === prop_id)
    const sameName =  allItems[index].values.some(item => item.name === name)

    if(sameName) return {
        success: false,
        data: { prop_id, name,},
        message: "Already have this prop type",
    }
    await update( {id, name: body.name!, prop_id: body.prop_id!})

    }else{
        const sameName =  allItems.some(item =>  (item.id !== id) && (item.name === name))

        if(sameName) return {
            success: false,
            data: {
                type_id: body.prop_id,
                name: name,
            },
            message: "Already have this subCategory",
        }
    await update({id, name, isFilterItem})

    }



        return {
            success: true,
            data: {

            },
            message: "success",
        }

})