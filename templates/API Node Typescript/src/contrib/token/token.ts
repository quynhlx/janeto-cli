import { sign, verify } from "jsonwebtoken";
import { ITokenConfig, IToken } from "../../interfaces";

export class Token implements IToken {
    private algorithm: string;
    private privateKey: string;
    private publicKey: string;
    private options: object;

    constructor(config: ITokenConfig) {
        this.algorithm = config.algorithm;
        this.privateKey = config.privateKey;
        this.publicKey = config.publicKey;
        this.options = {
            expiresIn: config.expiresIn
        };
    }
    /** generate a token */
    public generate(payload: object, options?: object): Promise<string> {
        return new Promise((resolve, reject) => {
            const optional = Object.assign({}, this.options, options);
            sign(payload, this.privateKey, optional, (err, token) => {
                return err ? reject(err) : resolve(token);
            });
        });
    }
    /** verify a token */
    public verify(token: string): Promise<boolean> {
        return new Promise((resolve) => {
            verify(token, this.publicKey, { algorithms: [this.algorithm] }, (err) => {
                return err ? resolve(false) : resolve(true);
            });
        });
    }
    /** decode a token */
    public decode(token: string): Promise<object> {
        return new Promise((resolve, reject) => {
            verify(token, this.publicKey, { algorithms: [this.algorithm] }, (err, decoded) => {
                return err ? reject(err) : resolve(decoded as object);
            });
        });
    }
}
