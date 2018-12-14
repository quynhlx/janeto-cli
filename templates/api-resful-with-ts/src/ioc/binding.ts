import { UserService } from './../service/user.service';
import { AsyncContainerModule } from "inversify";
import { MongoRepository } from "typeorm";
import { User } from "../entities";
import { getDbConnection } from "../db";
import { userRepository } from "../repositories";
import { TYPE } from "../constants/types";

export const bindings = new AsyncContainerModule(async (bind) => {

    await getDbConnection();
    await require('../controller/user.controller');

    bind<MongoRepository<User>>(TYPE.UserRepository).toDynamicValue(() => {
        return userRepository();
    }).inRequestScope();

    bind<UserService>(TYPE.UserService).to(UserService);

});