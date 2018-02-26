import { User } from "../../entities";

export interface IAuthService {
    /**
     * User login
     */
    login: (email: string, password: string) => Promise<object>;
    /**
     * User register
     */
    register: (user: User) => Promise<User>;
    /**
     * User forgot password
     */
    forgotPassword: (email: string) => Promise<boolean>;
    /**
     * User reset password
     */
    resetPassword: (user: User, newPass: string) => Promise<boolean>;
    /**
     * User reset password
     */
    activateUser: (user: User) => Promise<boolean>;
}
