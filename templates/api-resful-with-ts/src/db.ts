import { createConnection } from "typeorm";
import { User } from "./entities";

/*
Please set the env var:
export DATABASE_USER='' \
export DATABASE_PASSWORD='' \
export DATABASE_HOST=localhost \
export DATABASE_PORT=27017 \
export DATABASE_DB=votes
*/

export async function getDbConnection() {
    

    const DATABASE_HOST = process.env.DATABASE_HOST || "DESKTOP-Q6GE1GG";
    const DATABASE_USER = process.env.DATABASE_USER || "sa";
    const DATABASE_PORT = 1433;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "abc123";
    const DATABASE_DB = "pnp-db";

    console.log(DATABASE_USER)

    const entities = [
        User
    ];

    const conn = await createConnection({
        type: "mssql",
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