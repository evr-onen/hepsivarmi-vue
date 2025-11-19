import { userRepo } from "~/domains/auth/infrastructure/userStorage";
import type {IUserData} from "~/domains/auth/types/accountTypes";
import {nanoid} from "nanoid";

export default defineEventHandler(async (event) => {
    const body : IUserLoginForm = await readBody(event)
    const {email, password} = body
    const allUsers:IUser[] = await userRepo.getAll();
    const index = allUsers.findIndex((user) => user.email === email);
    const token = nanoid()

    if(index !== -1 && allUsers[index].password === password) {

        const userData : IUserData = {
            email: allUsers[index].name,
            name: allUsers[index].name,
        }


        // const token = "1|rs4tFYvI3nOkh6rZWRTb1DbVQff82zg5XGTpTitJ47a58658"
        await userRepo.setToken(allUsers[index].id! , token);
        return {
            success: true,
            data: {
                user: userData,
                token: token
            },
            user: {...userData },
            message: "Logged in successfully"
        }

    }
    return {
        success: false,
        data: {
            messages: {
                email: ['credential not match!!'],
                password:['credential not match!!']
            }
        },
        user: {},
        message: "Loggin failed"
    }
})