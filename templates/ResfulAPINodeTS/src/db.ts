import { createConnection } from "typeorm";
import { User } from "./entities";

export async function getDbConnection() {
    const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
    const DATABASE_USER = process.env.DATABASE_USER || "root";
    const DATABASE_PORT = parseInt(process.env.DATABASE_PORT as string) || 3306;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";
    const DATABASE_DB = process.env.DATABASE_NAME || "default-db";

    console.log(DATABASE_USER)

    const entities = [
        User
    ];

    const conn = await createConnection({
        type: "mysql",
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        entities: entities,
        synchronize: true
    });


    return conn;
}