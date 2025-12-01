import formDataToObject from '~/domains/app/utils/formDataToObject'
import { productRepo } from '~/domains/product/infrastructure/productStorage'
import { imageRepo } from '~/domains/image/infrastructure/imageStorage'
import type { IProduct } from "~/domains/product/types/productTypes";
import { ProductEntity, productPropertyEntities } from "~/domains/product/entities/productEntity";
import { nanoid } from "nanoid";

const { getAll, add} = productRepo

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event)
    const raw = formDataToObject(formData)
    const allItem:IProduct[] = await getAll()
    const id = nanoid()

    const payload: IProduct = {
        id,
        name: (raw.name as string) || "",
        mainCategory: (raw.mainCategory || {}) as Record<string, string>,
        subCategory: (raw.subCategory || {}) as Record<string, string>,
        brand: (raw.brand || {}) as Record<string, string>,
        variantTypes: (raw.variantTypes || []),
        variantProducts: (raw.variantProducts || []),
        images: [], // will be filled with public image paths (string[]) after upload
        properties: raw.properties || productPropertyEntities({})
    }

    // save images and collect their public paths
    const base64Images: string[] = (raw.images || [])
        .map((image: any) => image?.base64)
        .filter((val: unknown): val is string => typeof val === 'string' && !!val)

    if (base64Images.length) {
        const uploadedPaths = await imageRepo.addImages(base64Images, 'product', payload.name)
        payload.images = uploadedPaths
    }

    const product = ProductEntity(payload)

    const sameName = allItem.some((item:IProduct) => item.name === product.name)

    if(sameName) return {
        success: false,
        data: product,
        message: "Already have this product!!",
    }

    await add(product)

    return {
        success: true,
        message: "success",
        log: {
            body: product,
            allVariants: product.variantProducts,
        }
    }

})