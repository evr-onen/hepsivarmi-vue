import { userRepo } from "~/domains/auth/infrastructure/userStorage"

export default defineEventHandler(async (event) => {
    const {token} = await readBody(event)
    
    if (!token || token.trim() === '') {
        return {
            success: false,
            message: "Token is required",
            data: {
                user: {id: '', name: '', email: ''},
            }
        }
    }

    const allUsers = await userRepo.getAll();
    // Strict token matching: token must exist and match exactly
    const user = allUsers.find((userItem: IUser) => 
        userItem.token && userItem.token.trim() !== '' && userItem.token === token
    )

    if (!user) {
        return {
            success: false,
            message: "user check failed",
            data: {
                user: {id: '', name: '', email: ''},
            }
        }
    }

    const {id, name, email} = user;

    return {
        success: true,
        data: {
            user: { id, name, email },
            token: token
        },
        message: "user check successfully"
    }
})