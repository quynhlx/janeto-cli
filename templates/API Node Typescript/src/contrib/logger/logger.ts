import { createLogger, LogLevelString, stdSerializers } from "bunyan";
import { ILogger } from "../../interfaces";

export class Logger implements ILogger {
    private logger: any;
    private config: any;
    constructor() {
        this.config = this.defaultConfig();
        this.logger = createLogger({
            name: "server",
            streams: [
                {level: this.config.defaultConfig || "trace", stream: process.stdout}
            ],
            serializers: stdSerializers
        });
    }

    public error(message: string| object): void {
        this.logger.error(message);
    }

    public info(message: string| object): void {
        this.logger.info(message);
    }
    private defaultConfig() {
        return {
            consoleLevel: "trace"
        };
    }
}
