import { Request, Response } from "express";

import { User } from "../models/user";
import { IController } from "./controller";

export class UsersController implements IController {

    /**
     * index
     */
    public static index(request: Request, response: Response, next: any) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'index.html'));

        User.findAll()
            .then((users: []) => {
                return response.render("users/index.hbs", {
                    authenticated: request["authenticated"],
                    layout: "app",
                    users,
                });
            })
            .catch((err: any) => {
                console.error(UsersController.LOG, "cannot to restore users from database", err);
            });
    }

    /**
     * create
     */
    public static create(request: Request, response: Response, next: any) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'add.html'));

        response.render("users/create.hbs", {
            actionTitle: "Create",
            authenticated: request["authenticated"],
            title: "Create New User",
            url: "/users/create",
        });
    }

    /**
     * save
     */
    public static save(request: Request, response: Response, next: any) {

        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;
        const birthdate = request.body.birthdate;
        const country = request.body.country;

        // some validation MM
        console.log(name,
            email,
            password,
            birthdate,
            country);

        User.create({
            birthdate,
            country,
            email,
            name,
            password,
        }).then((data: any) => {
            console.log(data);
            return response.redirect("/users");
        }).catch((err: any) => {
            console.error(UsersController.LOG, "cannot to create user successfully", err);
            return response.redirect("/users/create");
        });
    }

    /**
     * edit
     */
    public static edit(request: Request, response: Response, next: any) {

        // response.sendFile(path.join(__dirname, '../', 'views', 'users', 'add.html'));

        User.findByPk(request.params.id)
            .then((user: any) => {
                response.render("users/create.hbs", {
                    actionTitle: "Update",
                    authenticated: request["authenticated"],
                    title: `Edit user ${request.params.id}`,
                    url: `/edit/${request.params.id}`,
                    user,
                });
            })
            .catch((err: any) => {
                console.log(err);
                return response.redirect("/users");
            });
    }

    /**
     * update
     */
    public static update(request: Request, response: Response, next: any) {

        User.findByPk(request.params.id)
            .then((user: User) => {
                return user.update({
                    birthDate: request.body.birthDate,
                    country: request.body.country,
                    email: request.body.email,
                    name: request.body.name,
                    password: request.body.password,
                });
            })
            .then((e: any) => {
                console.log(UsersController.LOG, "user updated sucessfully!!");
                response.redirect("/users");
            })
            .catch((err: any) => {
                console.log(UsersController.LOG, "cannot update user", err);
                response.redirect(`/users/${request.params.id}/edit`);
            });
    }

    /**
     * destroy
     */
    public static destroy(request: Request, response: Response, next: any) {

        User.destroy({
            where: {
                id: request.params.id,
            },
        }).then((data: any) => {
            console.info(UsersController.LOG, "user destroyed successfully", data);
            response.redirect("/users");
        }).catch((err: any) => {
            console.error("Error while destroying the User");
            response.redirect("/users");
        });
    }

    private static LOG: string = "UsersController";
}
