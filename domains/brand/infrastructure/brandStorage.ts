import { promises as fs } from 'fs'
import {  join } from 'path'
import { imageRepo } from '~/domains/image/infrastructure/imageStorage'
import type {IBrand} from "~/domains/brand/types/brandTypes";


const FILE = join(process.cwd(), 'domains/brand/infrastructure/data/brands.json')

async function getAll(): Promise<IBrand[]> {
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
async function create(id :string, name: string, files : File[] ): Promise<void> {
        const allBrands = await getAll()
        const imageResponse = await imageRepo.saveImage( files[0], 'brand', name )
        allBrands.push({id, name, logo:imageResponse})
        await save(allBrands)
}

async function save(items: IBrand[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(items))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function update(id :string, name: string, files ?: File[]): Promise<boolean> {
    const allBrands = await getAll()
    const index = allBrands.findIndex(item => item.id === id)

    if(files && files.length > 0){

    // remove all images saved with previous brand name
    await imageRepo.deleteAllImagesByName('brand', allBrands[index].name)

    const imageResponse = await imageRepo.saveImage( files[0], 'brand', name )

    allBrands[index] = {id, name, logo: imageResponse}
    }else{
        allBrands[index].name = name
    }
    await save(allBrands)

    return true
}

async function remove(id: string): Promise<boolean> {
    const allBrands = await getAll()
    const index = allBrands.findIndex(item => item.id === id)

    await imageRepo.deleteAllImagesByName('brand', allBrands[index].name)

    const filteredBrands =  allBrands.filter((item:IBrand)=>item.id !== id)

    await save(filteredBrands)
    return true
}

export const brandRepo = {
    getAll,
    create,
    save,
    update,
    remove,
}
