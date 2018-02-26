import { IUserModel } from "../../interfaces";

export interface IUserRepository {
    /**
     * find user(s)
     */
    find: (query: object, options?: object) => Promise<IUserModel[]>;
    /**
     * find 1 user
     */
    findOne: (query: object) => Promise<IUserModel | null>;
    /**
     * find user by email
     */
    findById: (id: string) => Promise<IUserModel | null>;
    /**
     * create user
     */
    create: (user: IUserModel) => Promise<IUserModel>;
    /**
     * update user by id
     */
    updateById: (id: string, modifier: object) => Promise<boolean>;
    /**
     * delete user by id
     */
    deleteById: (email: string) => Promise<boolean>;
    /**
     * count number of users
     */
    count: (query: object) => Promise<number>;
}
