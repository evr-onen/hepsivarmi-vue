import { promises as fs } from 'fs'
import { join } from 'path'
import type { ICart } from "~/domains/cart/types/cartTypes";

const FILE = join(process.cwd(), 'domains/cart/infrastructure/data/carts.json')

async function getAll(): Promise<ICart[]> {
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

async function save(allItems: ICart[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function create(newCart: ICart): Promise<void> {
    const allCarts = await getAll()
    allCarts.push(newCart)
    await save(allCarts)
}

async function update(updatedCart: ICart): Promise<boolean> {
    const allCarts = await getAll()
    const index = allCarts.findIndex((item: ICart) => item.id === updatedCart.id)
    
    if (index === -1) {
        return false
    }
    
    allCarts[index] = updatedCart
    await save(allCarts)
    return true
}

async function remove(id: string): Promise<boolean> {
    const allCarts: ICart[] = await getAll()
    const filteredCarts = allCarts.filter((cart: ICart) => cart.id !== id)
    await save(filteredCarts)
    return true
}

async function getAllByProduct(productId: string): Promise<ICart[]> {
    const allCarts = await getAll()
    return allCarts.filter((cart: ICart) => cart.product_id === productId)
}

async function getAllByUser(userId: string): Promise<ICart[]> {
    const allCarts = await getAll()
    return allCarts.filter((cart: ICart) => cart.user_id === userId)
}

async function getById(id: string): Promise<ICart | null> {
    const allCarts = await getAll()
    return allCarts.find((cart: ICart) => cart.id === id) || null
}

export const cartRepo = {
    getAll,
    save,
    create,
    update,
    remove,
    getAllByProduct,
    getAllByUser,
    getById,
}

