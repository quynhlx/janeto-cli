import {
    IAuthService,
    IUserRepository,
    IRepositories,
    IUserModel,
    IToken,
    IContrib,
    IMail,
    ITokenConfig
} from "../interfaces";
import { User } from "../entities";
import { Error } from "../constants";
import { hashWithSalt, genSalt, compare } from "../utils";

export class AuthService implements IAuthService {
    private userRepo: IUserRepository;
    private token: IToken;
    private mailer: IMail;
    private tokenConfig: ITokenConfig;

    constructor(repoList: IRepositories, contrib: IContrib, config: ITokenConfig) {
        this.userRepo = repoList.userRepository;
        this.token = contrib.token;
        this.mailer = contrib.mail;
        this.tokenConfig = config;
    }

    public async login(id: string, password: string): Promise<object> {
        try {
            let user = await this.userRepo.findOne({username: id});
            user = user || await this.userRepo.findOne({email: id});
            if (user) {
                if (!user.activated) {
                    throw Error.USER_UNACTIVATED;
                }
                const compareResult = await compare(password, user.password);
                if (compareResult) {
                    const payload = this.toResponseObj(user.toJSON() as User);
                    const token = await this.token.generate(payload);
                    return {payload, token};
                }
            }
            throw Error.WRONG_INFO;
        } catch (err) {
            throw err;
        }
    }

    public async register(user: User): Promise<User> {
        try {
            const userByEmail = await this.userRepo.findOne({ email:  user.email});
            const userByUsername = await this.userRepo.findOne({ username:  user.username});
            if (userByEmail || userByUsername) {
                throw Error.USER_EXIST;
            }
            const salt = await genSalt();
            const hashPass = await hashWithSalt(user.password, salt);
            user.salt = salt;
            user.password = hashPass;
            const newUser = await this.userRepo.create(user as IUserModel);

            const payload = this.toResponseObj(newUser.toJSON() as User);

            const token = await this.token.generate(payload);
            const isSent = await this.mailer.sendActivateUser(newUser, token);
            return payload;
        } catch (err) {
            throw err;
        }
    }

    public async forgotPassword(email: string): Promise<boolean> {
        try {
            const userByEmail = await this.userRepo.findOne({ email });
            if (!userByEmail) {
                throw Error.NOT_FOUND;
            }
            const payload = this.toResponseObj(userByEmail.toJSON() as User);
            const token = await this.token.generate(payload, {expiresIn: this.tokenConfig.resetTokenExpiresIn});
            const isSent = await this.mailer.sendForgotPassword(userByEmail, token);
            return isSent;
        } catch (err) {
            throw err;
        }
    }

    public async resetPassword(user: User, newPass: string): Promise<boolean> {
        try {
            const hashPass =  await hashWithSalt(newPass, user.salt);
            const updatedUser = await this.userRepo.updateById(user.id, { password : hashPass});
            if (!updatedUser) {
                throw Error.SYSTEM_ERROR;
            }
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }

    public async activateUser(user: User): Promise<boolean> {
        try {
            const updatedUser = await this.userRepo.updateById(user.id, { activated : true});
            if (!updatedUser) {
                throw Error.SYSTEM_ERROR;
            }
            return updatedUser;
        } catch (err) {
            throw err;
        }
    }

    private toResponseObj(user: User) {
        delete user.password;
        delete user.salt;
        return user;
    }
}
