import { Request, Response, NextFunction } from "express";
import { IRouteConfig, IUserService, CError, IUserQuery, IUserList } from "../../interfaces";
import { User } from "../../entities";

export class UserController {
    private userService: IUserService;

    constructor(config: IRouteConfig) {
        this.userService = config.services.userService;
    }

    public async search(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let query: IUserQuery = {
                queries: {
                    email: req.query["email"],
                    gender: req.query["gender"],
                    phone: req.query["phone"],
                    username: req.query["username"]
                },
                sort: req.query["sort"],
                page: req.query["page"] || 1,
                amount: req.query["amount"] || 5
            };
            // remove undefined properties
            query = JSON.parse(JSON.stringify(query));

            const userList: IUserList = await this.userService.search(query);
            res.json(userList);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.json({users});
        } catch (err) {
            next(new CError(err));
        }
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userForm = await User.fromObject(req.body);
            const user = await this.userService.createOne(userForm);
            res.json(user);
        } catch (err) {
            next(new CError(err));
        }
    }
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const modifier = await User.fromObject(req.body);
            const { user } = req.body;
            const updatedUser = await this.userService.updateById(user.id, modifier);
            res.json(updatedUser);
        } catch (err) {
            next(new CError(err));
        }
    }
    public async updateById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const modifier = await User.fromObject(req.body);
            const id = req.params["id"];
            const user = await this.userService.updateById(id, modifier);
            res.json(user);
        } catch (err) {
            next(new CError(err));
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params["id"];
            const result = await this.userService.deleteById(id);
            res.json(result);
        } catch (err) {
            next(new CError(err));
        }
    }
}
