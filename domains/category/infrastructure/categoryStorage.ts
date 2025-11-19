import { promises as fs } from 'fs'
import {  join } from 'path'
import type {ICategory, ISubCategory, ISubCategoryUpdateForm} from "~/domains/category/types/categoryTypes";



const FILE = join(process.cwd(), 'domains/category/infrastructure/data/categories.json')

async function getAll(): Promise<ICategory[]> {
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

async function add(id:string,name: string, main_id ?: string): Promise<void> {
    const AllCategories = await getAll()
    if(main_id){
        //add sub
        const index = AllCategories.findIndex((categoryItem:ICategory) => categoryItem.id === main_id)
        if (index === -1) return
        AllCategories[index].subs.push({id, name})
        await save(AllCategories)
    }else{
        //add empty main category
        await save([...AllCategories, {id, name, subs:[]}])
    }

}

async function save(allCategories: ICategory[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allCategories))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function update(id:string, name : string, main_id ?: string): Promise<boolean> {
    const allCategories = await getAll()
    const index = allCategories.findIndex(categoryItem => categoryItem.id === main_id)

    if(main_id){
        const subIndex =  allCategories[index].subs.findIndex((subItem:ISubCategory) => subItem.id === id)
        allCategories[index].subs[subIndex].name = name

        await categoryRepo.save(allCategories)
    }else{
        const index = allCategories.findIndex((categoryItem:ICategory)=>categoryItem.id === id)
        allCategories[index].name = name

        await save(allCategories)
    }
    return true
}

async function remove(main_id: string, sub_id?: string): Promise<boolean> {
    const allCategories:ICategory[] = await getAll()

    if(sub_id){
        const index = allCategories.findIndex((categoryItem:ICategory) => categoryItem.id === main_id)
        if (index === -1) return false
        const categorySubs = allCategories[index].subs.filter((subItem:ISubCategory)=>subItem.id !== sub_id)
        if (categorySubs.length === allCategories[index].subs.length) return false
        allCategories[index].subs = categorySubs

        await save(allCategories)
    }else{
        const filteredCategories = allCategories.filter((categoryItem:ICategory) => categoryItem.id !== main_id)

        await save(filteredCategories)
    }
    return true
}

export const categoryRepo = {
    getAll,
    add,
    save,
    update,
    remove,
}
