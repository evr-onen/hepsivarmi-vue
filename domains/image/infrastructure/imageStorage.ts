import fs from 'fs/promises'
import { join, extname } from 'path'

// helper to decode base64 (data URL or raw base64) to buffer + extension
const decodeBase64Image = (input: string): { buffer: Buffer; extension: string } => {
    const dataUrlMatch = input.match(/^data:(.+);base64,(.*)$/)

    let mime = 'image/jpeg'
    let base64Data = input

    if (dataUrlMatch) {
        mime = dataUrlMatch[1] || 'image/jpeg'
        base64Data = dataUrlMatch[2]
    }

    const buffer = Buffer.from(base64Data, 'base64')

    let extension = '.jpg'
    if (mime.includes('png')) extension = '.png'
    else if (mime.includes('gif')) extension = '.gif'
    else if (mime.includes('webp')) extension = '.webp'

    return { buffer, extension }
}

 async function saveImage(file: File | null | undefined, type: 'category' | 'product' | 'brand', name: string): Promise<string> {
    if (!file) {
        throw new Error('File is required for image upload')
    }
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    await fs.mkdir(uploadDir, { recursive: true })

    const files = await fs.readdir(uploadDir)
    const entityFiles = files.filter(f => f.startsWith(sanitizeFilename(name)))

    const nextIndex = entityFiles.length + 1
    const extension = file.name ? extname(file.name) || '.jpg' : '.jpg'
    const safeName = sanitizeFilename(name)
    const filename = `${safeName}_${nextIndex}${extension}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    return `/uploads/${type}/${filename}`
}

 async function addImages(files: (File | string | null | undefined)[], type: 'category' | 'product' | 'brand', name: string): Promise<string[]> {
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    await fs.mkdir(uploadDir, { recursive: true })

    const safeName = sanitizeFilename(name)
    
    // Delete existing files with the same name prefix to overwrite
    const existing = await fs.readdir(uploadDir)
    const entityFiles = existing.filter(f => f.startsWith(safeName))
    
    for (const f of entityFiles) {
        const filePath = join(uploadDir, f)
        try {
            await fs.unlink(filePath)
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err
        }
    }

    // Save new images starting from index 1
    let index = 1
    const saved: string[] = []

    for (const file of files) {
        if (!file) continue

        let buffer: Buffer
        let extension: string

        if (file instanceof File) {
            extension = file.name ? extname(file.name) || '.jpg' : '.jpg'
            buffer = Buffer.from(await file.arrayBuffer())
        } else if (typeof file === 'string') {
            const decoded = decodeBase64Image(file)
            buffer = decoded.buffer
            extension = decoded.extension
        } else {
            continue
        }

        const filename = `${safeName}_${index++}${extension}`
        const filePath = join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)
        saved.push(`/uploads/${type}/${filename}`)
    }

    return saved
}

 async function deleteAllImagesByName(type: 'category' | 'product' | 'brand', name: string): Promise<number> {
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    const safeName = sanitizeFilename(name)
    const files = await fs.readdir(uploadDir)
    const targetFiles = files.filter(f => f.startsWith(safeName))

    for (const f of targetFiles) {
        const filePath = join(uploadDir, f)
        try {
            await fs.unlink(filePath)
        } catch (err: any) {
            if (err.code !== 'ENOENT') throw err
        }
    }

    return targetFiles.length
}

 async function listImagesByName(type: 'category' | 'product' | 'brand', name: string): Promise<string[]> {
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    const safeName = sanitizeFilename(name)
    const files = await fs.readdir(uploadDir)
    return files
        .filter(f => f.startsWith(safeName))
        .map(f => `/uploads/${type}/${f}`)
}

function sanitizeFilename(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '')
}


export const imageRepo = {
    saveImage,
    addImages,
    deleteAllImagesByName,
    listImagesByName,
}
