import { promises as fs } from 'fs'
import { join } from 'path'
import type { IComment } from "~/domains/comment/types/commentTypes";

const FILE = join(process.cwd(), 'domains/comment/infrastructure/data/comments.json')

async function getAll(): Promise<IComment[]> {
    try {
        const content = await fs.readFile(FILE, 'utf-8')
        return JSON.parse(content || '[]')
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            return []
        }
        throw err
    }
}

async function save(allItems: IComment[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function create(newComment: IComment): Promise<void> {
    const allComments = await getAll()
    allComments.push(newComment)
    await save(allComments)
}

async function update(updatedComment: IComment): Promise<boolean> {
    const allComments = await getAll()
    const index = allComments.findIndex((item: IComment) => item.id === updatedComment.id)
    
    if (index === -1) {
        return false
    }
    
    allComments[index] = updatedComment
    await save(allComments)
    return true
}

async function remove(id: string): Promise<boolean> {
    const allComments: IComment[] = await getAll()
    const filteredComments = allComments.filter((comment: IComment) => comment.id !== id)
    await save(filteredComments)
    return true
}

async function getAllByProduct(productId: string): Promise<IComment[]> {
    const allComments = await getAll()
    return allComments.filter((comment: IComment) => comment.product_id === productId)
}

async function getById(id: string): Promise<IComment | null> {
    const allComments = await getAll()
    return allComments.find((comment: IComment) => comment.id === id) || null
}

export const commentRepo = {
    getAll,
    save,
    create,
    update,
    remove,
    getAllByProduct,
    getById,
}

