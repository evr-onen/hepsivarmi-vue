import { brandRepo } from '~/domains/brand/infrastructure/brandStorage'
import { nanoid } from 'nanoid'
import { readMultipartFormData } from 'h3'
import type { MultiPartData } from 'h3'

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    const id = nanoid()
    let name = ''
    const logoFiles: File[] = []

    formData?.forEach((field: MultiPartData) => {
        if (field.name === 'name') {
            name = field.data.toString()
        }

        if (field.name === 'logo' && field.filename) {
            const file = new File(
                [field.data],
                field.filename || `logo-${Date.now()}`,
                { type: field.type || 'application/octet-stream' }
            )
            logoFiles.push(file)
        }
    })

    const allBrands = await brandRepo.getAll()
    const sameName = allBrands.some(item => item.name === name)

    if (sameName) return {
        success: false,
        data: {
            name,
            errors: { name: ['Already have this brand'] }
        },
        message: "Already have this brand",
    }

    if (!logoFiles.length) {
        return {
            success: false,
            data: {
                name,
                errors: { logo: ['Logo is required'] }
            },
            message: "Logo is required",
        }
    }

    await brandRepo.create(id, name, logoFiles)

    return {
        success: true,
        message: "success",
    }

})