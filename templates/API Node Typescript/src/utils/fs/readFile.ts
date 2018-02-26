import * as fs from "fs";

export const readFile = (path: string): Promise<string> => {
    return new Promise((resol, reject) => {
        fs.readFile(path, "utf8", (err, data) => {
            return err ? reject(err) : resol(data);
        });
    });
};
