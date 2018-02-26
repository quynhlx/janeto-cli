import { IUser } from "../interfaces";
import { clone } from "../utils";
import { Roles } from "../constants";

export class User implements IUser {
    /** create user from object */
    public static async fromObject(obj: object): Promise<User> {
        const user = await clone(obj, new User());
        return user;
    }
    public id: string;
    public username: string;
    public gender: string;
    public email: string;
    public phone: string;
    public avatar: string;
    public role: string;
    public password: string;
    public salt: string;
    public activated: boolean;

    constructor() {
        this.id = "";
        this.username = "";
        this.gender = "";
        this.email = "";
        this.phone = "";
        this.avatar = "";
        this.role = Roles.User;
        this.password = "";
        this.salt = "";
        this.activated = false;
    }

    public toJS() {
        return {
            id: this.id,
            username: this.username,
            gender: this.gender,
            email: this.email,
            phone: this.phone,
            avatar: this.avatar,
            role: this.role,
            password: this.password,
            salt: this.salt,
            activated : this.activated
        };
    }
}
