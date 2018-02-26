import { connect } from "mongoose";
import Config from "../config";

export interface IDBConfig {
    name: string;
    uri: string;
}
export default class Database {
    public uri: string;
    public DB: string;

    constructor(config: IDBConfig) {
        this.uri = config.uri;
        this.DB = config.name;
    }

    public async connect() {
        try {
            const uri = `${this.uri}/${this.DB}`;
            const db = await connect(uri);
            return db;
        } catch (err) {
            throw err;
        }
    }
}
