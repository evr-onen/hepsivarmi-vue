import {productRepo} from '~/domains/product/infrastructure/productStorage'
import type {IProduct} from "~/domains/product/types/productTypes";

export default defineEventHandler(async (event) => {
    const products : IProduct[] =await productRepo.getAll()
    const searchValue = getQuery(event).search as string
    const filteredProducts = products.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue.toLowerCase()))
        return {
            success: true,
            data: filteredProducts,
            message: "success",
        }

})