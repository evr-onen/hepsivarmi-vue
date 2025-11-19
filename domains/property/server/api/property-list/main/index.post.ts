import { nanoid } from 'nanoid'

import { categoryRepo } from '~/domains/category/infrastructure/categoryStorage'
import type{ ICategory } from "~/domains/category/types/categoryTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name } = body
    const allCategories = await categoryRepo.getAll()

    const id = nanoid()
    const sameName = allCategories.some((categoryItem:ICategory) => categoryItem.name === name);

    if(sameName){
        return {
            success: true,
            data: {
                id,
                name,
            },
            message: "Already have this category",
        }
    }

    await categoryRepo.add(id, name)

    return {
            success: true,
            data: {
                id,
                name,
            },
            message: "success"
        }

})