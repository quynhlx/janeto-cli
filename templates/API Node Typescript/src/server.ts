import * as express from "express";
import * as bodyParser from "body-parser";
import { RequestHandlerParams } from "express-serve-static-core";
import * as morgan from "morgan";
import * as http from "http";

import Config from "./config";

export interface IServerOptions {
    port: number;
}

export default class Server {
    public options: IServerOptions;
    private app: express.Express;
    private server: http.Server;

    constructor(options: Config) {
        // set configuration
        this.config(options);
        this.app = express();
        // configure middleware
        this.defaultMiddleware();
    }
    /**
     * Server listening
     */
    public listen(cb?: any) {
        this.app.listen(this.options.port, cb);
    }

    /**
     * Add Router config
     */
    public addRoutes(prefix: string, route: express.Router) {
        this.app.use(prefix, route);
    }

    /**
     * Add middleware
     */
    public addMiddleWare(func: RequestHandlerParams) {
        this.app.use(func);
    }

    /**
     * Config middleware
     */
    private defaultMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan("dev"));
    }

    /**
     * Set configuration
     */
    private config(options: Config) {
        this.options = {
            port: options.PORT || 19696
        };
    }
}
