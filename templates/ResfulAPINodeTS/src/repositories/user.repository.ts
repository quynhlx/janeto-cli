import {getConnection } from "typeorm";
import { User } from "../entities";

export function userRepository() {
    const conn = getConnection();
    const userRepository = conn.getRepository(User);
    return userRepository;
}