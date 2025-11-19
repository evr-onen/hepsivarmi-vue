import {object, string} from 'yup';
import type {IUserRegisterForm} from "../types/accountTypes";

const useUserFormValidation = () => {
    const userRegisterFormSchema = object({
        name: string().required('Name is required'),
        email: string().email().required('Email is required'),
        password: string().required('Password is required'),
        password_confirmation: string().required('Password confirmation is required'),
    })
    const userLoginFormSchema = object({
        email: string().required('Email is required'),
        password: string().required('Password is required'),
    })

    const userRegisterValidation = (userRegisterForm:IUserRegisterForm) => {
        return FormValidator<IUserRegisterForm>(userRegisterFormSchema, userRegisterForm);
    }
    const userLoginValidation = (userLoginForm:IUserLoginForm) => {
        return FormValidator<IUserLoginForm>(userLoginFormSchema, userLoginForm);
    }

    // const accountEditValidation = (accountForm:IAccountForm) => {
    //     return FormValidator<IAccountForm>(accountFormSchema, accountForm);
    // }

    return {
        userRegisterValidation,
         userLoginValidation,
    }
}



export default useUserFormValidation;