import fs from 'fs/promises'
import { join, extname } from 'path'

 async function saveImage(file: File, type: 'category' | 'product', name: string): Promise<string> {
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    await fs.mkdir(uploadDir, { recursive: true })

    const files = await fs.readdir(uploadDir)
    const entityFiles = files.filter(f => f.startsWith(sanitizeFilename(name)))

    const nextIndex = entityFiles.length + 1
    const extension = extname(file.name) || '.jpg'
    const safeName = sanitizeFilename(name)
    const filename = `${safeName}_${nextIndex}${extension}`

    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = join(uploadDir, filename)
    await fs.writeFile(filePath, buffer)

    return `/uploads/${type}/${filename}`
}

 async function addImages(files: File[], type: 'category' | 'product', name: string): Promise<string[]> {
    const uploadDir = join(process.cwd(), 'public', 'uploads', type)
    await fs.mkdir(uploadDir, { recursive: true })

    const existing = await fs.readdir(uploadDir)
    const entityFiles = existing.filter(f => f.startsWith(sanitizeFilename(name)))
    let index = entityFiles.length + 1

    const safeName = sanitizeFilename(name)
    const saved: string[] = []

    for (const file of files) {
        const extension = extname(file.name) || '.jpg'
        const filename = `${safeName}_${index++}${extension}`

        const buffer = Buffer.from(await file.arrayBuffer())
        const filePath = join(uploadDir, filename)
        await fs.writeFile(filePath, buffer)
        saved.push(`/uploads/${type}/${filename}`)
    }

    return saved
}

 async function deleteAllImagesByName(type: 'category' | 'product', name: string): Promise<number> {
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

 async function listImagesByName(type: 'category' | 'product', name: string): Promise<string[]> {
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
