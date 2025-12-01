import { promises as fs } from 'fs'
import {  join } from 'path'
import type {IProduct} from "~/domains/product/types/productTypes";



const FILE = join(process.cwd(), 'domains/product/infrastructure/data/product.json')

async function getAll(): Promise<IProduct[]> {
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

async function save(allItems: IProduct[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}


async function add(newProduct: IProduct): Promise<void> {
    const AllItems = await getAll()
    AllItems.push(newProduct)
    
    await save(AllItems)
}


async function update( updatedProduct: IProduct): Promise<boolean> {
    const allItems = await getAll()
    const index = allItems.findIndex((item:IProduct)=>item.id === updatedProduct.id)
    allItems[index] = updatedProduct

    await save(allItems)
}
   

async function remove(id: string): Promise<boolean> {
    const allItems:IProduct[] = await getAll()
    const filteredCategories = allItems.filter((productItem:IProduct) => productItem.id !== id)

    await save(filteredCategories)
    return true
}

export const productRepo = {
    getAll,
    add,
    save,
    update,
    remove,
}
