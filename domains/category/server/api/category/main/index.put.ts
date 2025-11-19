import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'
import type {ICategory} from "~/domains/category/types/categoryTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {id, name} = body

    const allCategories = await categoryRepo.getAll()
    const sameName = allCategories.some((categoryItem:ICategory) => categoryItem.name.toLowerCase() === body.name.toLowerCase());

    if(sameName){
        return {
            success: false,
            data: {
                payload: body,
                errors:{name:['Already have this Main Category']}
            },
            message: "Already have this category",
        }
    }

    await categoryRepo.update(id, name)

        return {
            success: true,
            data: {
                id: body.id,
                parent_id: body.parent_id,
                name: body.name,
            },
            message: "success",
        }

})