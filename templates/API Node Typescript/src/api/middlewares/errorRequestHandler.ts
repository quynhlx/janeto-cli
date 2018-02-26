import { Request, Response, NextFunction } from "express";
import { CError, ILogger } from "../../interfaces";

export const ErrorRequestHandler = (logger: ILogger) => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof CError) {
            res.status(err.status).json(err.toResponseJSON());
        } else {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }
        logger.error(err);
        return;
    };
};
