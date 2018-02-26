import { Request, Response, NextFunction } from "express";

/**
 * Config Express Header middleware
 */
export const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Website you wish to allow to connect, allow everything
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization, x-access-token");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // intercept OPTIONS method
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
