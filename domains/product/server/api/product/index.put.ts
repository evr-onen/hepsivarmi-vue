import formDataToObject from '~/domains/app/utils/formDataToObject'
import { productRepo } from '~/domains/product/infrastructure/productStorage'
import { imageRepo } from '~/domains/image/infrastructure/imageStorage'
import type { IProduct } from "~/domains/product/types/productTypes";
import { ProductEntity, productPropertyEntities } from "~/domains/product/entities/productEntity";

const { getAll, update } = productRepo

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const raw = formDataToObject(formData)
    const allItems: IProduct[] = await getAll()
    
    const productId = (raw.id as string) || ""
    const existingProduct = allItems.find((item: IProduct) => item.id === productId)

    if (!existingProduct) {
        return {
            success: false,
            message: "Product not found!",
        }
    }

    const payload: IProduct = {
        id: productId,
        name: (raw.name as string) || existingProduct.name,
        mainCategory: (raw.mainCategory || existingProduct.mainCategory) as Record<string, string>,
        subCategory: (raw.subCategory || existingProduct.subCategory) as Record<string, string>,
        brand: (raw.brand || existingProduct.brand) as Record<string, string>,
        variantTypes: (raw.variantTypes || existingProduct.variantTypes),
        variantProducts: (raw.variantProducts || existingProduct.variantProducts),
        images: existingProduct.images, // will be updated if new images are provided
        properties: raw.properties || existingProduct.properties || productPropertyEntities({})
    }

    // Handle image updates: delete old images and save new ones
    const base64Images: string[] = (raw.images || [])
        .map((image: any) => image?.base64)
        .filter((val: unknown): val is string => typeof val === 'string' && !!val)

    if (base64Images.length > 0) {
        // Delete existing images for this product (using existing product name)
        await imageRepo.deleteAllImagesByName('product', existingProduct.name)
        
        // Save new images
        const uploadedPaths = await imageRepo.addImages(base64Images, 'product', payload.name)
        payload.images = uploadedPaths
    }

    const product = ProductEntity(payload)

    // Check for duplicate name (excluding current product)
    const sameName = allItems.some((item: IProduct) => 
        item.id !== product.id && item.name === product.name
    )

    if (sameName) {
        return {
            success: false,
            data: product,
            message: "Already have this product name!!",
        }
    }

    await update(product)

    return {
        success: true,
        message: "success",
        log: {
            body: product,
            allVariants: product.variantProducts,
        }
    }
})
