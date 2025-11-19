import {propertyRepo} from '~/domains/property/infrastructure/propertyStorage'
import type {IPropType} from "~/domains/property/types/propertyTypes";

export default defineEventHandler(async () => {
    const properties : IPropType[] =await propertyRepo.getAll()

        return {
            success: true,
            data: properties,
            message: "success",
        }

})