import { userRepo } from "~/domains/auth/infrastructure/userStorage"

export default defineEventHandler(async (event) => {
    const {token} = await readBody(event)
    const allUsers  = await userRepo.getAll();
    const index = allUsers.findIndex((userItem : IUser)=> userItem.token === token)

    if(index === -1){
        return {
            success: false,
            message: "user check failed",
            data:{
                user:{id:'',name:'', email:''},
            }
        }
    }
    const {id, name, email} = allUsers[index]
    const user = { id, name, email }


    return {
        success: true,
        data: {
            user: user,
            token: token
        },
        user: { id, name, email },
        message: "user check successfully"
    }
})