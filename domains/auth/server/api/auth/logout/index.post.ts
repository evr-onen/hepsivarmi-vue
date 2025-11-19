export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if(body && body.email === 'evren' && body.password === '1234'){

        const user = {
            id: 1,
            name: "Evren Onen",
            email: "evr.onen@gmail.com",
            phone: null,
            created_at: "2025-09-16T10:11:43.000000Z",
            updated_at: "2025-09-16T10:11:43.000000Z",
            email_verified_at: "2025-09-16T10:11:43.000000Z"
        }

        const token = "1|rs4tFYvI3nOkh6rZWRTb1DbVQff82zg5XGTpTitJ47a58658"
        return {
            success: true,
            data: {
                user: user,
                token: token
            },
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            message: "Logged in successfully"
        }
    }
    return {
        success: false,
        data: {},
        user: {},
        message: "Loggin failed"
    }
})