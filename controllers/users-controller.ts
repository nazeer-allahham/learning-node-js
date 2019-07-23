import { Request, Response } from "express";

import { Controller } from './controller';
import { DataFactory } from './../database/data-factory';
import { User } from "../models/user";

export class UsersController implements Controller {

    /**
     * index
     */
    public static index(request: Request, response: Response, next) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'index.html'));

        DataFactory.fetch<User>('users', (rows: User[]) => {
            console.log("usersusersusersusersusersusers", rows);

            response.render('users/index.pug', {
                'users': rows
            });
        });
    }

    /**
     * create
     */
    public static create(request: Request, response: Response, next) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'add.html'));

        response.render('users/push.pug', {
            title: 'Create New User',
            actionTitle: 'Create',
            url: '/add'
        })
    }

    /**
     * save
     */
    public static save(request: Request, response: Response, next) {

        DataFactory.save('users', new User(
            -1,
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.birthdate,
            request.body.country),
            () => {
                response.redirect('/');
            });
    }

    /**
     * edit
     */
    public static edit(request: Request, response: Response, next) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'add.html'));

        DataFactory.get<User>('users', 'id', request.params.id, (row: User) => {
            console.log("UUUUUUUUserUUUUUser", row, row.birthDate.toLocaleDateString());

            if (row == undefined) {
                console.log('unable to get User :( make sure that you are right and logic is true');
                response.redirect('/');
                return;
            }

            response.render('users/push.pug', {
                title: `Edit user ${request.params.id}`,
                actionTitle: 'Update',
                url: `/edit/${request.params.id}`,
                user: row
            });
        });
    }

    /**
     * update
     */
    public static update(request: Request, response: Response, next) {

        DataFactory.get<User>('users', 'id', request.params.id, (row: User) => {

            const user = new User(row.id,
                row.name,
                row.email,
                row.password,
                row.birthDate,
                row.country);

            user.name = request.body.name;
            user.email = request.body.email;
            user.password = request.body.password;
            user.birthDate = request.body.birthDate;
            user.country = request.body.country;

            user.save()
                .then((res) => {
                    console.log('Saved successfully!');
                    response.redirect('/');
                })
                .catch((err) => {
                    response.redirect('/');
                });
        });
    }

    /**
     * destroy
     */
    public static destroy(request: Request, response: Response, next) {

        console.log(request.params.id)

        DataFactory.remove<User>('users', 'id', request.params.id, (err) => {
            if (err) {
                console.error('Error while destroying the User');
            }
            response.redirect('/');
        });
    }
}