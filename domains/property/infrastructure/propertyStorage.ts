import { promises as fs } from 'fs'
import {  join } from 'path'
import type {IPropType, IPropTypeValue } from "~/domains/property/types/propertyTypes";



const FILE = join(process.cwd(), 'domains/property/infrastructure/data/properties.json')

async function getAll(): Promise<IPropType[]> {
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

async function save(allItems: IPropType[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}


async function add(data:{id:string,name: string, isFilterItem: boolean, prop_id ?: string} ): Promise<void> {
    const AllItems = await getAll()
    if(data.prop_id){

        //add type Value
        const index = AllItems.findIndex((item:IPropType) => item.id === data.prop_id)
        if (index === -1) return

        AllItems[index].values.push({id:data.id, name:data.name})
        await save(AllItems)
    }else{
        //add empty property
        await save([...AllItems, {id: data.id, name: data.name, isFilterItem: data.isFilterItem, values:[]}])
    }

}


async function update(data: {id:string, name : string, prop_id ?: string, isFilterItem ?:boolean}): Promise<boolean> {
    const allItems = await getAll()

    if(data.prop_id){
        const index = allItems.findIndex(item => item.id === data.prop_id)
        const valueIndex =  allItems[index].values.findIndex((item:IPropTypeValue) => item.id === data.id)
        allItems[index].values[valueIndex].name = data.name

        await save(allItems)
    }else{
        const index = allItems.findIndex((item:IPropType)=>item.id === data.id)
        allItems[index].name = data.name
        if(data.isFilterItem) allItems[index].isFilterItem = data.isFilterItem

        await save(allItems)
    }
    return true
}

async function remove(id: string, prop_id?: string): Promise<boolean> {
    const allItems:IPropType[] = await getAll()

    if(prop_id){
        const index = allItems.findIndex((categoryItem:IPropType) => categoryItem.id === prop_id)
        if (index === -1) return false
        const filteredValues = allItems[index].values.filter((subItem:IPropTypeValue)=>subItem.id !== id)
        if (filteredValues.length === allItems[index].values.length) return false
        allItems[index].values = filteredValues

        await save(allItems)
    }else{
        const filteredCategories = allItems.filter((categoryItem:IPropType) => categoryItem.id !== id)

        await save(filteredCategories)
    }
    return true
}

export const propertyRepo = {
    getAll,
    add,
    save,
    update,
    remove,
}
