import { Request, Response, NextFunction } from "express";
import { IRouteConfig, IAuthService, CError } from "../../interfaces";
import { User } from "../../entities";

export class AuthController {
    private authService: IAuthService;

    constructor(config: IRouteConfig) {
        this.authService = config.services.authService;
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userForm: User = await User.fromObject(req.body);
            const user = await this.authService.register(userForm);
            res.json(user);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, password } = req.body;
            const result = await this.authService.login(id, password);
            res.json(result);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.body;
            const result = await this.authService.forgotPassword(email);
            res.json(result);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { newPassword, user } = req.body;
            const result = await this.authService.resetPassword(user, newPassword);
            res.json(result);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async activateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { user } = req.body;
            const result = await this.authService.activateUser(user);
            res.json(result);
        } catch (err) {
            next(new CError(err));
        }
    }
}
