import { IUserService } from './../interface/IService/IUserService';
import * as express from "express";
import { inject } from "inversify";
import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    request,
    response,
    requestParam,
    requestBody
} from "inversify-express-utils";

import { Repository } from "typeorm";
import { User } from './../entities/user.entity';
import { TYPE } from "../constants/types";
import { UserService } from '../service/user.service';

@controller("/api/users")
export class UserController {
    public constructor(@inject(TYPE.UserService) private userService: IUserService) {
    }
    @httpGet('/')
    public async search(
        @request() req: express.Request,
        @response() res: express.Response) {
        var page = Number.parseInt(req.query.page || 0);
        var pageSize =  Number.parseInt(req.query.pageSize || 0);
        var options = req.query;

        try {
            return this.userService.search(options, page, pageSize);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

    @httpGet('/:id')
    public async get(
        @requestParam('id') id: string,
        @response() res: express.Response) {
        try {
            return this.userService.findById(id);
        } catch (e) {
            res.status(404);
            res.send(e.message);
        }

    }

    @httpPost('/')
    public async post(
        @requestBody() newUser: User,
        @response() res: express.Response) {
        try {
            return this.userService.createOne(newUser);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

    @httpPut('/:id')
    public async put(
        @requestParam('id') id: string,
        @requestBody() modifier: User,
        @response() res: express.Response
    ) {
        try {
            return this.userService.updateById(id, modifier);
        } catch (e) {
            res.status(404);
            res.send(e.message);
        }

    }

    @httpDelete('/:id')
    public async delete(
        @requestParam('id') id: string,
        @response() res: express.Response
    ) {
        try {
            return this.userService.deleteById(id);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }
}