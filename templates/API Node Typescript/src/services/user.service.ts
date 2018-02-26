import {
    IUserService,
    IUserRepository,
    IRepositories,
    IUserModel,
    IUserList,
    IUserQuery
} from "../interfaces";
import { User } from "../entities";
import { Error } from "../constants";
import { genSalt, hashWithSalt } from "../utils";

export class UserService implements IUserService {
    private userRepo: IUserRepository;

    constructor(repoList: IRepositories) {
        this.userRepo = repoList.userRepository;
    }

    public async findOne(query: object): Promise<User | null> {
        try {
            const user = await this.userRepo.findOne(query);
            if (!user) {
                throw Error.NOT_FOUND;
            }
            return user;
        } catch (err) {
            throw err;
        }
    }
    public async search(query: IUserQuery) {
        try {
            const totalUser = await this.userRepo.count(query.queries);
            const options = {
                skip: (query.page > 1) ? ((query.page - 1) * totalUser) : 0,
                limit: query.amount,
                sort: { username : query.sort || -1 }
            };
            const userList = await this.userRepo.find(query.queries, options);
            const users: User[] = [];
            userList.forEach((user) => {
                const u = user.toJSON() as User;
                delete u.salt;
                delete u.password;
                users.push(u);
            });
            const result: IUserList = {
                users,
                totalPage: Math.floor((totalUser / query.amount) + 1),
                totalUser,
                currentPages: query.page
            };
            return result;
        } catch (err) {
            throw err;
        }
    }

    public async findById(id: string): Promise<User> {
        try {
            const userById = await this.userRepo.findById(id);
            if (!userById) {
                throw Error.NOT_FOUND;
            }
            return userById;
        } catch (err) {
            throw err;
        }
    }

    public getAllUsers(): Promise<User[]> {
        return this.userRepo.find({});
    }

    public async createOne(user: User): Promise<User> {
        try {
            const userByEmail = await this.userRepo.findOne({ email:  user.email});
            const userByUsername = await this.userRepo.findOne({ username:  user.username});
            if (userByEmail || userByUsername) {
                throw Error.USER_EXIST;
            }
            const salt = await genSalt();
            const hashPass = await hashWithSalt(user.password, salt);
            user.salt = salt;
            user.password = hashPass;
            user.activated = true;
            const newUser = await this.userRepo.create(user as IUserModel);

            const payload = newUser.toJSON() as User;
            delete payload.password;
            delete payload.salt;
            return payload;
        } catch (err) {
            throw err;
        }
    }
    public async updateById(id: string, modifier: User): Promise<boolean> {
        try {
            const userById = await this.userRepo.findById(id);
            if (!userById) {
                throw Error.NOT_FOUND;
            }
            if (modifier.password) {
                const salt = await genSalt();
                const hashPass = await hashWithSalt(modifier.password, salt);
                modifier.salt = salt;
                modifier.password = hashPass;
            }
            return this.userRepo.updateById(id, modifier);
        } catch (err) {
            throw err;
        }
    }
    public async deleteById(id: string): Promise<boolean> {
        try {
            const userById = await this.userRepo.findById(id);
            if (!userById) {
                throw Error.NOT_FOUND;
            }
            return this.userRepo.deleteById(id);
        } catch (err) {
            throw err;
        }
    }
}
