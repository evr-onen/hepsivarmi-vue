export interface IUserRegisterForm extends IUser {
    password_confirmation  : string;
}

export interface IUserLoginForm{
    email                    : string;
    password                 : string;
}

export interface IUser{
    id                      ?: string;
    name                    : string;
    email                   : string;
    password                : string;
    token                   ?: string;
}

export interface IUserData {
    name                    : string;
    email                   : string;
}