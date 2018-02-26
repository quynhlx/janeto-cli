export interface IToken {
    /** Generate a token */
    generate: (payload: object, options?: object) => Promise<string>;
    /** verify a token */
    verify: (token: string) => Promise<boolean>;
    /** decode a token */
    decode: (token: string) => Promise<object>;
}

export interface ITokenConfig {
     // RS256, RS512 ..
     algorithm: string;
     // time in string: '6h'
     expiresIn: string;
     // time in string in case user forgot password
     resetTokenExpiresIn: string;
     // content of RSA256 key
     publicKey: string;
     // content of RSA256 private key
     privateKey: string;
     // this key will be used if the algorithm is not RSA
     secretKey?: string;
}
