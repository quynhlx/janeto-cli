import { Router } from "express";
import { IRouteConfig } from "../../interfaces";
import { UserController } from "./users.controller";
import { authMiddleware } from "../middlewares";
import { Roles } from "../../constants";

export const UserRoutes = (config: IRouteConfig): Router => {
    const router = Router();
    const controller =  new UserController(config);
    const adminRequired = authMiddleware({
        role: Roles.Admin,
        token: config.contrib.token,
        userService: config.services.userService
    });
    router.post("/", adminRequired, controller.create.bind(controller));
    router.put("/:id", adminRequired, controller.updateById.bind(controller));
    router.delete("/:id", adminRequired, controller.delete.bind(controller));

    const tokenRequired = authMiddleware({
        role: Roles.User,
        token: config.contrib.token,
        userService: config.services.userService
    });
    router.use(tokenRequired);
    router.get("/", controller.getAllUsers.bind(controller));
    router.get("/search", controller.search.bind(controller));
    router.put("/", controller.update.bind(controller));
    return router;
};
