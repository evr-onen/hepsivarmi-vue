
export interface IUserLoginForm {
    email: string;
    password: string;
}
export interface IUserRegisterForm extends IUserLoginForm {
    name: string;
    password_confirmation: string;
}
export interface IUser{
    name: string;
    email: string;
}
