import { Document } from "mongoose";
import { User } from "../../entities";

export interface IUser {
    id: string;
    username: string;
    gender: string;
    email: string;
    phone: string;
    birthday?: Date;
    avatar?: string;
    role?: string;
    password: string;
    salt?: string;
}

export interface IUserModel extends User, Document {
    id: string;
}
