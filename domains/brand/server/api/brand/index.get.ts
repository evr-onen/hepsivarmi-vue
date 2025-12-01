import {brandRepo} from '~/domains/brand/infrastructure/brandStorage'
import type {IBrand} from "~/domains/brand/types/brandTypes";

export default defineEventHandler(async () => {
    const brands : IBrand[] = await brandRepo.getAll()

        return {
            success: true,
            data: brands,
            message: "success",
        }

})