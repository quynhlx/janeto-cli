import {getMongoRepository } from "typeorm";
import { User } from "../entities";

export function userRepository() {
    const userRepository = getMongoRepository(User);
    return userRepository;
}