import { Logger } from "./logger";
import { Token } from "./token";
import { Mail } from "./mail";
import Config from "../config";
import { ILogger, IContrib, IToken, IMail } from "../interfaces";

export class Contrib implements IContrib {
    public logger: ILogger;
    public token: IToken;
    public mail: IMail;

    constructor(config: Config) {
        this.logger = new Logger();
        this.token = new Token(config.TokenConfig);
        this.mail = new Mail(config, this.logger);
    }
}
