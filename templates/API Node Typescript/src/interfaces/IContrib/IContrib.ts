import { ILogger, IToken, IMail } from ".";

export interface IContrib {
    logger: ILogger;
    token: IToken;
    mail: IMail;
}
