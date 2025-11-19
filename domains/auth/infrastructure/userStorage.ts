import { promises as fs } from 'fs'
import {  join } from 'path'
import type {
    IUser,
    IUserRegisterForm
} from "~/domains/auth/types/accountTypes";
import {nanoid} from "nanoid";



const FILE = join(process.cwd(), 'domains/auth/infrastructure/data/users.json')

async function getAll(): Promise<IUser[]> {
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

async function add(body: IUser ): Promise<void> {
    const id = nanoid()
    const {name, email, password} = body
    const AllUsers = await getAll()


    AllUsers.push({id, name, email, password})
    await save([...AllUsers, {id, name, email, password}])

}

async function save(allUsers: IUser[]): Promise<void> {
    const plain = JSON.parse(JSON.stringify(allUsers))
    await fs.writeFile(FILE, JSON.stringify(plain, null, 2), 'utf-8')
}

async function update(body:IUserRegisterForm): Promise<boolean> {
    const allUsers:IUser[] = await getAll()
    const {id, name, email, password} = body
    const index = allUsers.findIndex(userItem => userItem.id === id)

    allUsers[index].name = name
    allUsers[index].email = email
    allUsers[index].password = password

    await save(allUsers)
    return true
}

async function remove(id: string): Promise<boolean> {
    const allUser:IUser[] = await getAll()

    const filteredCategories = allUser.filter((userItem:IUser) => userItem.id !== id)
    await save(filteredCategories)

    return true
}
async function setToken(id: string, token :string) {
    const allUsers:IUser[] = await getAll()
    const index = allUsers.findIndex(userItem => userItem.id === id)
    allUsers[index].token = token

    await save(allUsers)
}
async function removeToken(id: string,) {
    const allUsers:IUser[] = await getAll()
    const index = allUsers.findIndex(userItem => userItem.id === id)
    allUsers[index].token = ''

    await save(allUsers)
}



export const userRepo = {
    getAll,
    add,
    save,
    setToken,
    removeToken,
    update,
    remove,
}
