import { readFile } from "../utils";
import Config from "./config";
import { IConfigFile } from "./config";

export const readConfig = async (configFile: IConfigFile): Promise<Config> => {
    const file: string = await readFile(configFile.filePath);
    const configData: Config  = JSON.parse(file);
    const secretKey = configData.TokenConfig.secretKey || "default";
    if (configData.TokenConfig.algorithm.includes("HS")) {
        configData.TokenConfig.privateKey = secretKey;
        configData.TokenConfig.publicKey = secretKey;
    } else {
        configData.TokenConfig.privateKey = await readFile(configFile.privateKey) || secretKey;
        configData.TokenConfig.publicKey = await readFile(configFile.privateKey) || secretKey;
    }
    return configData;
};
