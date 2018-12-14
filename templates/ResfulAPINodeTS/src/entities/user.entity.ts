import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ObjectIdColumn } from "typeorm";
import { Roles } from "../constants/roles";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    username: string;

    @Column()
    gender: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    avatar: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    activated: boolean;
}
