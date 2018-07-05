import { IPagedEntities } from './../common';
import { User } from "../../entities";
import { FindManyOptions } from "typeorm";
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
     * find user by id
     */
    findById: (id: string) => Promise<User | undefined>;
    /**
     * find users by query
     */
    search: (query: FindManyOptions<User>, page: number, pageSize: number) => Promise<IPagedEntities<User>>;
}
