import {nanoid} from "nanoid";
import { userRepo } from '~/domains/auth/infrastructure/userStorage'
import type {IUser} from "~/domains/auth/types/accountTypes";

export default defineEventHandler(async (event) => {
    const body:IUserRegisterForm = await readBody(event)
    const {name, email, password, password_confirmation} = body
    const token = nanoid()
        // const date = new Date();
        // const isoFormat = date.toISOString();


    if(password === password_confirmation){
       await userRepo.add({name, email, password})

        return {
            success: true,
            data: {
                user: {name, email },
                token: token
            },
            user: { name, email },
            message: "Register in successfully"
        }
    }
    return {
        success: false,
        data: {
            messages: {
                email:'credential not match!!',
                password:'credential not match!!'
            }
        },
        user: {},
        message: "Register failed"
    }
})