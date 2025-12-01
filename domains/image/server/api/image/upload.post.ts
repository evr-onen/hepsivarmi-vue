import { imageRepo } from '~/domains/image/infrastructure/imageStorage'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    
    if (!formData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'No form data provided'
        })
    }

    let file: File | null = null
    let type: 'category' | 'product' | null = null
    let name: string | null = null

    for (const field of formData) {
        if (field.name === 'file' && field.filename) {
            file = new File([field.data], field.filename, { type: field.type || 'image/jpeg' })
        } else if (field.name === 'type') {
            type = field.data.toString() as 'category' | 'product'
        } else if (field.name === 'name') {
            name = field.data.toString()
        }
    }

    if (!file || !type || !name) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: 'Missing required fields: file, type, or name'
        })
    }

    try {
        const path = await imageRepo.saveImage(file, type, name)
        
        return {
            success: true,
            data: {
                path
            },
            message: 'Image uploaded successfully'
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: error.message || 'Failed to upload image'
        })
    }
})

