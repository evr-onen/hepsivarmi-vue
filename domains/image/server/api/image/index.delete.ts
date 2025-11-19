import { propertyRepo} from '~/domains/property/infrastructure/propertyStorage'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {remove} = propertyRepo
    const { id, prop_id } = body

    if(prop_id){
        console.log('prop_id', prop_id)
        await remove(id!, prop_id )
    }else{
        await remove(id! )
    }
        return {
            success: true,
            message: "success"
        }

})