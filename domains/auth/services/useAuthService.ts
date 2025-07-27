// import type {IJob, IJobForm, IJobRequestForm, TJobs} from "../types/JobTypes";
import type {AxiosResponse} from "axios";
import type { IUserRegisterForm, IUserLoginForm } from "../types/accountTypes";
import useAuthRepository from "../repositories/useAuthRepository";

const useAuthService = () => {

    const {
        register,
        login,
        logout,
        user,
    } = useAuthRepository()

    const registerAction = async (payload: IUserRegisterForm): Promise<void> => {
        return await register(payload);
    }

    const loginAction = async (payload: IUserLoginForm, cb: (response: AxiosResponse) => void): Promise<void> => {
        const response = await login(payload);
        cb(response);
    }

    const logoutAction = async () => {
        return await logout();
    }

    const getUserAction = async ():Promise<IUser> => {
        return await user()
    }

    return {
        registerAction,
        loginAction,
        logoutAction,
        getUserAction
    }
}

export default useAuthService;