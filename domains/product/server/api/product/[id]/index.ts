import { productRepo } from '~/domains/product/infrastructure/productStorage'
import type { IProduct } from "~/domains/product/types/productTypes";

export default defineEventHandler(async (event) => {
    const productId = event.context.params?.id as string

    if (!productId) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'Product ID is required.' 
        });
    }

    const { getAll } = productRepo
    const allProducts: IProduct[] = await getAll()
    
    const product = allProducts.find((item: IProduct) => item.id === productId)
    
    if (!product) {
        throw createError({ 
            statusCode: 404, 
            statusMessage: 'Not Found', 
            message: `Product with ID ${productId} not found.` 
        });
    }

    return {
        success: true,
        data: product,
        message: "success",
    }
})

