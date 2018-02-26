import * as MailService from "@sendgrid/mail";
import { MailData } from "@sendgrid/helpers/classes/mail";

import { IMail, IMailConfig, IMailData, ILogger } from "../../interfaces";
import { User } from "../../entities";
import Config from "../../config";
import { Email } from "../../constants";

import {
    activateUserHTMLTemplate,
    forgotPasswordHTMLTemplate
} from "./mail-template";

export class Mail implements IMail {
    private mailConfig: IMailConfig;
    private url: string;
    private logger: ILogger;
    private mailService = MailService;

    constructor(config: Config, logger: ILogger) {
        this.mailConfig = config.MailConfig;
        this.url = config.URL;
        this.logger = logger;
        this.mailService.setApiKey(this.mailConfig.apiKey);
    }

    public sendActivateUser(user: User, token: string): Promise<boolean> {
        const html = activateUserHTMLTemplate(user, token, this.url);
        const mailData: IMailData = {
            to: [user.email],
            subject: Email.CONFIRM_EMAIL_TITLE,
            html
        };
        return this.send(mailData);
    }

    public async sendForgotPassword(user: User, token: string): Promise<boolean> {
        const html = await forgotPasswordHTMLTemplate(token, this.url);
        const mailData: IMailData = {
            to: [user.email],
            subject: Email.FORGOT_PASSWORD_TITLE,
            html
        };
        return this.send(mailData);
    }

    public send(data: IMailData): Promise<any> {
        const dataSender: MailData = {
            to: data.to,
            from: {
                name: this.mailConfig.fromName,
                email: this.mailConfig.fromEmail
            },
            subject: data.subject,
            text: data.text,
            html: data.html
        };
        return this.mailService.send(dataSender)
        .then(() => true)
        .catch((err) => {
            this.logger.error(err);
            throw err;
        });
        // return Promise.resolve(true);
    }
}
