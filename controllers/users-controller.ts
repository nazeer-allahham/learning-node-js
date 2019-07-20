import { DataFactory } from './../database/data-factory';
import { Controller } from './controller';
import { User } from "../models/user";
import { Request, Response } from "express";

export class UsersController implements Controller {

    /**
     * index
     */
    public static index(request: Request, response: Response, next) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'index.html'));

        const users = DataFactory.fetch<User>(User.name);

        console.log(users);

        response.render('users/index.pug', {
            'users': users
        });
    }

    /**
     * create
     */
    public static create(request: Request, response: Response, next) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'add.html'));

        response.render('users/push.pug', {
            title: 'New user'
        })
    }

    /**
     * save
     */
    public static save(request: Request, response: Response, next) {

        new User(
            request.body.name,
            request.body.email,
            request.body.password).save();

        response.redirect('/');
    }
}