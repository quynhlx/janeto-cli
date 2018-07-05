import { TYPE } from './../constants/types';
import { inject, injectable } from 'inversify';
import { IPagedEntities, PagedEntities } from './../interface/common';
import { User } from './../entities/user.entity';
import { IUserService } from "../interface";
import { Repository, FindManyOptions, MongoRepository } from "typeorm";

@injectable()
export class UserService implements IUserService {

    constructor(@inject(TYPE.UserRepository) private userRepository: MongoRepository<User>) { }

    createOne(user: User): Promise<User> {
        return this.userRepository.save(user).then(user => {
            return user;
        }).catch(reason => {
            return (reason);
        });
    }

    updateById(id: string, modifier: User): Promise<boolean> {
        return this.userRepository.update(id, modifier).then(result => {
            return Promise.resolve(true);
        }).catch(reason => {
            return Promise.reject(false);
        });
    }

    deleteById(id: string): Promise<boolean> {
        return this.userRepository.delete(id).then(value => {
            return Promise.resolve(true);
        }).catch(() => {
            return Promise.reject(false);
        });
    }

    findById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne(id);
    }

    search(query: FindManyOptions<User>, page: number = 0, pageSize: number = 10): Promise<IPagedEntities<User>> {
        query.take = pageSize;
        query.skip = page * pageSize;
        return this.userRepository.findAndCount(query).then((value) => {
            return new PagedEntities(page, pageSize, value[1], value[0]);
        });
    }

}