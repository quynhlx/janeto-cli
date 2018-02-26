import { User } from "../../entities";

export interface IUserQuery {
    queries: {
        username?: string;
        phone?: string;
        email?: string;
        gender?: string;
    };
    sort?: number;
    page: number;
    amount: number;
}

export interface IUserList {
    users: User[];
    totalUser: number;
    totalPage: number;
    currentPages: number;
}
