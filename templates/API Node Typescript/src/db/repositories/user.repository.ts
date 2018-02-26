import { RepositoryBase } from "./repositoryBase";
import { UserModel } from "../models";
import { IUserRepository, IUserModel } from "../../interfaces";

export class UserRepository extends RepositoryBase<IUserModel> implements IUserRepository {
    constructor() {
        super(UserModel);
    }
}
