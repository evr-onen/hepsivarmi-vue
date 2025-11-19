import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'
import type {ICategory, ISubCategory} from "~/domains/category/types/categoryTypes";
import {nanoid} from "nanoid";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const allCategories:ICategory[] = await categoryRepo.getAll()
    const id = nanoid()

    if (body.main_id){
        const categoryIndex = allCategories.findIndex((categoryItem) => categoryItem.id === body.main_id)
        const sameName = allCategories[categoryIndex].subs.some((subItem:ISubCategory) => subItem.name === body.name)
        if(sameName) return {
            success: false,
            data: {
                errors:{name:['Already have this subCategory']}
            },
            message: "Already have this  subcategory!!",
        }

        await categoryRepo.add(id, body.name, allCategories[categoryIndex].id)
    }else{
        const sameName = allCategories.some(mainItem => mainItem.name === body.name)

        if(sameName) return {
            success: false,
            data: {
                name: body.name,
                errors:{name:['Already have this subCategory']}
            },
            message: "Already have this variant Value",
        }

        await categoryRepo.add(id, body.name)
    }

        return {
            success: true,
            message: "success",
            log: {
                body: allCategories,
                allVariants: allCategories,
            }
        }

})