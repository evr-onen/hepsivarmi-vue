import { productRepo } from '~/domains/product/infrastructure/productStorage'
import { imageRepo } from '~/domains/image/infrastructure/imageStorage'
import type { IProduct } from "~/domains/product/types/productTypes";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id } = body

    if (!id) {
        throw createError({ 
            statusCode: 400, 
            statusMessage: 'Bad Request', 
            message: 'Product ID is required for deletion.' 
        });
    }

    const { getAll, remove } = productRepo
    const allProducts: IProduct[] = await getAll()
    
    // Find the product to be deleted
    const productToDelete = allProducts.find((product: IProduct) => product.id === id)
    
    if (!productToDelete) {
        throw createError({ 
            statusCode: 404, 
            statusMessage: 'Not Found', 
            message: `Product with ID ${id} not found.` 
        });
    }

    // Delete all images associated with this product
    if (productToDelete.name && productToDelete.images && productToDelete.images.length > 0) {
        await imageRepo.deleteAllImagesByName('product', productToDelete.name)
    }

    // Delete the product
    await remove(id)

    return {
        success: true,
        message: "Product and its images deleted successfully"
    }
})