import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'
import type {ISubCategoryUpdateForm} from "~/domains/category/types/categoryTypes";

export default defineEventHandler(async (event) => {
    const body: ISubCategoryUpdateForm = await readBody(event)
    const {id, main_id, name} = body

    const allCategories = await categoryRepo.getAll()
    const index = allCategories.findIndex(categoryItem => categoryItem.id === main_id)
    const sameName =  allCategories[index].subs.some(categoryItem => categoryItem.name === name && categoryItem.id !== id)

    if(sameName) return {
        success: false,
        data: {
            errors:{name:['Already have this subCategory']}
        },
        message: "Already have this subCategory",
    }

    await categoryRepo.update(id, name, main_id)

        return {
            success: true,
            data: {
                variant : allCategories[index],
            },
            message: "success",
        }

})