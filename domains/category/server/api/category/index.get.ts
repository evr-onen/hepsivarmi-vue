import {categoryRepo} from '~/domains/category/infrastructure/categoryStorage'
import type {ICategory} from "~/domains/category/types/categoryTypes";

export default defineEventHandler(async () => {
    const variants : ICategory[] =await categoryRepo.getAll()

        return {
            success: true,
            data: variants,
            message: "success",
            log: {
                all: variants,
            }
        }

})