import bcrypt = require("bcryptjs");
import { Request, Response } from "express";

import { Environment } from "./../environment";
import { User } from "./../models/user";
import { IController } from "./controller";

export class AuthController implements IController {

    public static showLoginForm(request: Request, response: Response) {
        console.log(request["csrfToken"]());
        return response.render("auth/login.hbs", {
            authenticated: request["authenticated"],
            csrfToken: request["csrfToken"](),
            title: "Login",
            url: "/auth/login",
        });
    }

    public static login(request: Request, response: Response, next: any) {
        const email = request.body.email;
        const password = request.body.password;
        console.log("HHHHHHHHHHHHHIiiiiiiiiii", [email, password]);

        let uu;
        User.findOne({
            where: { email },
        }).then((user: any) => {
            if (!user) {
                console.log("no user has the same email");
                throw new Error("invalid email");
            }
            console.log("password", user.password);
            uu = user;
            // return bcrypt.compare(password, user.password);
            return new Promise((resolve) => {
                const encryptedPassword = bcrypt.compareSync(password, uu.password);
                console.log(uu.password, encryptedPassword, encryptedPassword);
                resolve(encryptedPassword);
            });
        }).then((result: boolean) => {
            console.log(result);

            if (result) {
                request.session!["authenticated"] = true;
                request.session!["token"] = uu.id;
                console.log("authenticatedauthenticatedauthenticated", [
                    request.session!["authenticated"],
                    request.session!["token"],
                ]);
                return response.redirect("/posts");
            } else {
                throw new Error("invalid password");
            }
        }).catch((err: any) => {
            console.error(AuthController.LOG, "cannot to login successfully", err);
            request.session!["authenticated"] = false;
            request.session!["token"] = undefined;
            return response.render("auth/login", {
                actionTitle: "Submit",
                authenticated: request["authenticated"],
                errors: [
                    err,
                ],
                title: "Login",
                url: "/auth/login",
            });
        });
    }

    public static showRegisterationForm(request: Request, response: Response) {

        return response.render("auth/register.hbs", {
            actionTitle: "Submit",
            authenticated: request["authenticated"],
            csrfToken: request["csrfToken"](),
            title: "Register",
            url: "/auth/register",
        });
    }

    public static register(request: Request, response: Response) {
        const name = request.body.name;
        const email = request.body.email;
        const password = request.body.password;
        const confirmPassword = request.body.confirmPassword;
        const birthdate = request.body.birthdate;
        const country = request.body.country;

        // some validation MM
        console.log(AuthController.LOG, "try register new user with the credintial", {
            birthdate,
            confirmPassword,
            country,
            email,
            name,
            password,
        });

        if (password !== confirmPassword) {
            console.error(AuthController.LOG, "password doesn't match");
            return response.render("auth/register", {
                actionTitle: "Submit",
                authenticated: request["authenticated"],
                errors: [
                    "Password doesn't match",
                ],
                title: "Register",
                url: "/auth/register",
            });
        }

        User.findOne({
            where: { email },
        }).then((row: any) => {
            console.log(row);
            if (row) {
                console.log(row);
                throw new Error("User email must to be unique");
            }

            return bcrypt.hash(password, Environment.BCRYPT_SALT);
        }).then((hash: string) => {
            console.log(hash);

            return User.create({
                birthdate,
                country,
                email,
                name,
                password: hash,
            });
        }).then((data: any) => {
            console.log(data);
            return response.redirect("/auth/login");
        }).catch((err: any) => {
            console.error(AuthController.LOG, "cannot to create user successfully", err);
            return response.render("auth/register", {
                actionTitle: "Submit",
                authenticated: request["authenticated"],
                errors: [
                    err,
                ],
                title: "Register",
                url: "/auth/register",
            });
        });
    }

    public static resetPassword(request: Request, response: Response) {

        return response.render("auth/reset-password.hbs", {
            authenticated: request["authenticated"],
            title: "Reset Password",
        });
    }

    public static logout(request: Request, response: Response) {
        // response.setHeader("Set-Cookie", "authenticated=false");
        request.session!.destroy((err: any) => {
            if (err) {
                console.error("LOGOUTTTT", "Failed", err);
            } else {
                console.info("LOGOUTTTT", "succeded");
            }
            return response.redirect("/auth/login");
        });
    }

    private static LOG: string = "AUTH_CONTROLLER";

    // private static hashPassword(password: string, rounds: number, callback: (error: Error, hash: string) => void): void {
    //     bcrypt.hash(password, rounds, (err, hash) => {
    //         console.log("Failed to hash password", [password]);
    //         callback(err, hash);
    //     });
    // }
}
