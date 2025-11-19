import { promises as fs } from 'fs'
import {  join } from 'path'
import type {IVariant, VariantValue} from "~/domains/variant/types/variantTypes";
import {nanoid} from "nanoid";



const FILE = join(process.cwd(), 'domains/variant/infrastructure/data/variants.json')

async function getAll(): Promise<IVariant[]> {
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

async function add(id:string, name: string, type_id ?: string): Promise<void> {
    const variants = await getAll()
    if(type_id){
        //add value
        const index = variants.findIndex(variant => variant.id === type_id)
        if (index === -1) return
        variants[index].values.push({id, name})
        await save(variants)
    }else{
        //add empty variant
        await save([...variants, {id, name, values:[]}])
    }

}

async function save(variants: IVariant[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(variants)) // reactive vs kır
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

// id, value_id, name
async function update(variant:IVariant, oldVariant : IVariant, variantValue : VariantValue,): Promise<boolean> {
        const variants = await getAll()
    if(variant.name !== oldVariant.name) {
       // changed type by select input
        await add(variantValue.name, variant.id)
    }else{
        // change value
        const typeIndex = variants.findIndex(variantItem => variantItem.id === variant.id)
        const valueIndex = variants[typeIndex].values.findIndex(valueItem => valueItem.id === variantValue.id)
        variants[typeIndex].values[valueIndex].name = variantValue.name
        await save(variants)
    }
    return true
}

async function updateTypeName(type_id:string, name : string): Promise<boolean> {
    // changed by textInput
    const variants = await getAll()
    const typeIndex = variants.findIndex(variantItem => variantItem.id === type_id)
    variants[typeIndex].name = name
    await save(variants)
    return true
}

async function remove(type_id: string, Value_id?: string): Promise<boolean> {
    const variants = await getAll()

    if(Value_id){
        const index = variants.findIndex(variant => variant.id === type_id)
        if (index === -1) return false
        const variantValues = variants[index].values.filter(variantValue=>variantValue.id !== Value_id)
        if (variantValues.length === variants.length) return false
        variants[index].values = variantValues

        await save(variants)
    }else{
        const filteredVariants = variants.filter(variantItem => variantItem.id !== type_id)

        await save(filteredVariants)
    }

    // if(type_id){
    //     // type_id varsa value silinecek
    //     const index = variants.findIndex(variant => variant.id === type_id)
    //     if (index === -1) return false
    //
    //     const variantValues = variants[index].values.filter(variantValue=>variantValue.id !== variant_id)
    //     if (variantValues.length === variants.length) return false
    //     variants[index].values = variantValues
    //     await save(variants)
    //
    // }else{
    //     // type silinecek
    //     const filtered = variants.filter(variant => variant.id === variant_id)
    //     await save(filtered)
    // }

    return true
}

export const variantRepo = {
    getAll,
    add,
    save,
    updateTypeName,
    update,
    remove,
}
