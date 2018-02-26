export interface ILogger {
    /** Logger log message level info */
    info: (message: string| object) => void;

    /** Logger log message level error */
    error: (message: string| object) => void;
}
