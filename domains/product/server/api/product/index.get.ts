import {productRepo} from '~/domains/product/infrastructure/productStorage'
import type {IProduct} from "~/domains/product/types/productTypes";

export default defineEventHandler(async () => {
    const products : IProduct[] =await productRepo.getAll()

        return {
            success: true,
            data: products,
            message: "success",
        }

})