import { resolve } from "path";
import { readConfig } from "./util";
import { ITokenConfig, IMailConfig } from "../interfaces";
import { IDBConfig } from "../db";

export const configFile = {
    filePath: resolve("config", "config.json"),
    privateKey: resolve("config", "key", "privateKey"),
    publicKey: resolve("config", "key", "publicKey")
};
export interface IConfigFile {
    filePath: string;
    privateKey: string;
    publicKey: string;
}
export default class Config {
    public static async bootstap(): Promise<Config> {
        const config = new Config();

        const content  = await readConfig(configFile);

        config.PORT = content.PORT;
        config.URL = content.URL;
        config.DB = content.DB;
        config.TokenConfig = content.TokenConfig;
        config.MailConfig = content.MailConfig;
        return config;
    }
    public PORT: number;
    public URL: string;
    public DB: IDBConfig;
    public TokenConfig: ITokenConfig;
    public MailConfig: IMailConfig;
}
