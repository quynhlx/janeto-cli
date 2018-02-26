import { User } from "../../entities";
import { IUserList, IUserQuery } from "../../interfaces";
export interface IUserService {
    /**
     * createOne user
     */
    createOne: (user: User) => Promise<User>;
    /**
     * Update user by Id
     */
    updateById: (id: string, modifier: User) => Promise<boolean>;
    /**
     * Delete user by Id
     */
    deleteById: (id: string) => Promise<boolean>;
    /**
     * Get list of all users
     */
    getAllUsers: () => Promise<User[]>;
    /**
     * find user by id
     */
    findById: (id: string) => Promise<User | null>;
    /**
     * find one user
     */
    findOne: (query: object) => Promise<User | null>;
    /**
     * find users by query
     */
    search: (query: IUserQuery) => Promise<IUserList>;
}
