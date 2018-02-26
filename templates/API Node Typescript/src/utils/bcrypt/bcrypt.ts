import * as bcrypt from "bcrypt";

const bcryptConfig = {
    saltRounds: 10
};

export const genSalt = (): Promise<string> => {
    return bcrypt.genSalt(bcryptConfig.saltRounds);
};

export const hashWithSalt = (plainText: string, salt: string): Promise<string> => {
    return bcrypt.hash(plainText, salt);
};

export const compare = (plainText: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plainText, hash);
};
