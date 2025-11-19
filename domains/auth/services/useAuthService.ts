import type {AxiosResponse} from "axios";
import type {  IUserLoginForm } from "../types/accountTypes";
import useAuthRepository from "../repositories/useAuthRepository";

const useAuthService = () => {

    const {
        login,
        register,
        logout,
        user,
    } = useAuthRepository()

    const loginAction = async (payload: IUserLoginForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await login(payload);
        cb(response);
    }

    const registerAction = async (payload: IUserRegisterForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await register(payload);
        cb(response);
    }

    const logoutAction = async () => {
        return await logout();
    }

    const getUserAction = async (payload: string, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await user(payload);
        cb(response);
    }

    return {
        loginAction,
        logoutAction,
        registerAction,
        getUserAction
    }
}

export default useAuthService;