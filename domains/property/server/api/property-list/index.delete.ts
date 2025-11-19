import { propertyListRepo } from '~/domains/property/infrastructure/propertyListStorage'
import type{IPropertyListPropDeleteForm} from '~/domains/property/types/propertyListTypes'

export default defineEventHandler(async (event) => {
    const {id, list_id}:IPropertyListPropDeleteForm = await readBody(event)
    const {remove} = propertyListRepo

    if(list_id){
        await remove(id!, list_id )
    }else{
        await remove(id! )
    }
    return {
        success: true,
        message: "success"
    }

})