import { Router } from "express";
import { IRouteConfig, IContrib } from "../../interfaces";
import { AuthController } from "./auth.controller";
import { authMiddleware } from "../middlewares";
import { Roles } from "../../constants";
export const AuthRoutes = (config: IRouteConfig): Router => {
    const router = Router();
    const controller =  new AuthController(config);
    const tokenRequired = authMiddleware({
        role: Roles.User,
        token: config.contrib.token,
        userService: config.services.userService
    });

    router.post("/register", controller.register.bind(controller));
    router.post("/login", controller.login.bind(controller));
    router.post("/forgot-password", controller.forgotPassword.bind(controller));
    router.post("/reset-password", tokenRequired, controller.resetPassword.bind(controller));
    router.post("/activate-user", tokenRequired, controller.activateUser.bind(controller));
    return router;
};
