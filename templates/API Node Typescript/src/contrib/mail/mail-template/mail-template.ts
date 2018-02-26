import {resolve} from "path";

import { User } from "../../../entities";
import { readFile } from "../../../utils";

export const activateUserHTMLTemplate = (user: User, token: string, url: string) => {
    // tslint:disable-next-line
    return `<p>Hello ${user.username}</p><p>Please click the link below to active your account</p><a target="_blank" href="${url}/auth/activate/${token}">Click here to active your account</a>`;
};

export const forgotPasswordHTMLTemplate = async ( token: string, url: string) => {
    let HTMLTemplate: string = await readFile(resolve(__dirname, "./forgot-template.html"));
    HTMLTemplate = HTMLTemplate.replace("$url", `${url}/auth/forget-password/${token}`);
    return HTMLTemplate;
};
