import {
    IRepositories,
    IUserRepository
} from "../../interfaces";
import { UserRepository } from ".";

export default class Repositories implements IRepositories {
    public userRepository: IUserRepository;
    /**
     * Create new Repository DI
     */
    constructor() {
        this.userRepository = new UserRepository();
    }
}
