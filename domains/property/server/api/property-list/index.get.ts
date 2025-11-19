import {propertyListRepo} from '~/domains/property/infrastructure/propertyListStorage'
import type {IPropertyList} from "~/domains/property/types/propertyListTypes";

export default defineEventHandler(async () => {
    const propertyLists : IPropertyList[] =await propertyListRepo.getAll()

    return {
        success: true,
        data: propertyLists,
        message: "success",
    }

})