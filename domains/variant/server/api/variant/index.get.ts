import {variantRepo} from '~/domains/variant/infrastructure/variantStorage'
import type {IVariant} from "~/domains/variant/types/variantTypes";
export default defineEventHandler(async () => {



    const variants : IVariant[] =await variantRepo.getAll()



        return {
            success: true,
            data: variants,
            message: "success",
            log: {
                all: variants,
            }
        }

})