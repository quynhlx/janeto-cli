import { IObject } from "../interfaces";
/**
 * High performance clone object to a class instance
 */
export const clone = <T> (src: IObject, dest: T) => {
    return Promise.resolve().then(() => {
        for (let i = 0, keys = Object.keys(dest); i < keys.length; ++i) {
            const key = keys[i];
            if (src.hasOwnProperty(key)) {
            (dest as IObject)[key] = src[key];
            }
        }
        // for mongo _id
        if (src.hasOwnProperty("_id")) {
            (dest as IObject)["id"] = typeof src["_id"] === "string" ? src["_id"] : src["_id"].toString();
        }
        return dest;
    });
};
