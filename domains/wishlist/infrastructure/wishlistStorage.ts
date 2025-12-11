import { promises as fs } from 'fs'
import { join } from 'path'
import type { IWishlist } from "~/domains/wishlist/types/wishlistTypes";

const FILE = join(process.cwd(), 'domains/wishlist/infrastructure/data/wishlists.json')

async function getAll(): Promise<IWishlist[]> {
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

async function save(allItems: IWishlist[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function create(newWishlist: IWishlist): Promise<void> {
    const allWishlists = await getAll()
    allWishlists.push(newWishlist)
    await save(allWishlists)
}

async function update(updatedWishlist: IWishlist): Promise<boolean> {
    const allWishlists = await getAll()
    const index = allWishlists.findIndex((item: IWishlist) => item.id === updatedWishlist.id)
    
    if (index === -1) {
        return false
    }
    
    allWishlists[index] = updatedWishlist
    await save(allWishlists)
    return true
}

async function remove(id: string): Promise<boolean> {
    const allWishlists: IWishlist[] = await getAll()
    const filteredWishlists = allWishlists.filter((wishlist: IWishlist) => wishlist.id !== id)
    await save(filteredWishlists)
    return true
}

async function getAllByUser(userId: string): Promise<IWishlist[]> {
    const allWishlists = await getAll()
    return allWishlists.filter((wishlist: IWishlist) => wishlist.user_id === userId)
}

async function getById(id: string): Promise<IWishlist | null> {
    const allWishlists = await getAll()
    return allWishlists.find((wishlist: IWishlist) => wishlist.id === id) || null
}

export const wishlistRepo = {
    getAll,
    save,
    create,
    update,
    remove,
    getAllByUser,
    getById,
}

