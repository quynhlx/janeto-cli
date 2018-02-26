import { IAuthService, IUserService } from ".";

export interface IServices {
    authService: IAuthService;
    userService: IUserService;
}
