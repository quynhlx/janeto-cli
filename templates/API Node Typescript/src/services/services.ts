import {
    UserService,
    AuthService
} from ".";
import {
    IRepositories,
    IServices,
    IUserService,
    IAuthService,
    IContrib
} from "../interfaces";
import Config from "../config";

export default class Services implements IServices {
    public userService: IUserService;
    public authService: IAuthService;
    /**
     * Create new services DI
     */
    constructor(contructor: {repositories: IRepositories, contrib: IContrib, config: Config }) {
        this.userService = new UserService(contructor.repositories);
        this.authService = new AuthService(contructor.repositories, contructor.contrib, contructor.config.TokenConfig);
    }
}
