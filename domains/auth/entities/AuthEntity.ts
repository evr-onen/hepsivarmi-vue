export const authUserEntity = (User:Partial<IUser>): Partial<IUser> => {
    return structuredClone({
        id: User.id || "",
        name: User.name || "",
        email: User.email || "",
    })
}


export const createAuthUserEntity = (User:Partial<IUser>): Partial<IUser> => {
    return structuredClone({
        name: User.name || "",
        email: User.email || "",
    })
}
export const createAuthUserRegistrationFormEntity = (form:Partial<IUserRegisterForm>): IUserRegisterForm => {
    return structuredClone({
        name: form.name || "",
        email: form.email || "",
        password: form.password || "",
        password_confirmation: form.password_confirmation || "",
    })
}
export const createAuthUserLoginFormEntity = (form:Partial<IUserLoginForm>): IUserLoginForm => {
    return structuredClone({
        email: form.email || "",
        password: form.password || "",
    })
}

export const createAuthUserLoginFormErrorsEntity = (): TErrorBag => {
    return structuredClone({
        email: [],
        password: [],
    })
}
export const createAuthUserRegistrationFormErrorsEntity = (): TErrorBag => {
    return structuredClone({
        name: [],
        email: [],
        password: [],
        password_confirmation: [],
    })
}


