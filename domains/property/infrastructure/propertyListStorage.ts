import { promises as fs } from 'fs'
import {  join } from 'path'
import type {IPropertyList, IPropertyListProp} from "~/domains/property/types/propertyListTypes";



const FILE = join(process.cwd(), 'domains/property/infrastructure/data/property-list.json')

async function getAll(): Promise<IPropertyList[]> {
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

async function save(allItems: IPropertyList[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allItems))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function add(id:string,name: string, list_id ?: string): Promise<void> {
    const allItems = await getAll()

    if(list_id){
        //add prop
        const index = allItems.findIndex((item:IPropertyList) => item.id === list_id)
        if (index === -1) return
        allItems[index].props.push({id, name})
        await save(allItems)
    }else{
        //add empty property list
        await save([...allItems, {id, name, props:[]}])
    }

}



async function update(data:{id:string, name : string, props ?:IPropertyListProp[] ,list_id ?: string}): Promise<boolean> {
    const allItems = await getAll()

    if(data.list_id){
        const index = allItems.findIndex(item => item.id === data.list_id)
        const propIndex =  allItems[index].props.findIndex((propItem:IPropertyListProp) => propItem.id === data.id)
        allItems[index].props[propIndex].name = data.name

        await save(allItems)
    }else{
        if(data.props){

        const index = allItems.findIndex((item:IPropertyList)=>item.id === data.id)
        allItems[index].name = data.name
        allItems[index].props = data.props
        await save(allItems)
        }
    }
    return true
}

async function remove(id: string, list_id?: string): Promise<boolean> {
    const allItems:IPropertyList[] = await getAll()

    if(list_id){
        const index = allItems.findIndex((item:IPropertyList) => item.id === list_id)
        if (index === -1) return false
        const filteredProps = allItems[index].props.filter((item:IPropertyListProp)=>item.id !== id)
        if (filteredProps.length === allItems[index].props.length) return false
        allItems[index].props = filteredProps

        await save(allItems)
    }else{
        const filteredLists = allItems.filter((categoryItem:IPropertyList) => categoryItem.id !== id)

        await save(filteredLists)
    }
    return true
}

export const propertyListRepo = {
    getAll,
    add,
    save,
    update,
    remove,
}
