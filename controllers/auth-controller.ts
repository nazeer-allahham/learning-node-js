import { Request, Response } from "express";

import { IController } from "./controller";

export class AuthController implements IController {

    public static showLoginForm(request: Request, response: Response) {

        return response.render("auth/login.hbs", {
            authenticated: request["authenticated"],
            title: "Login",
            url: "/login",
        });
    }

    public static login(request: Request, response: Response, next: any) {
        request.session!["authenticated"] = true;
        request.session!["token"] = "1";

        console.log("Hi my name is Login and is say that request.session!['authenticated']=", request.session!["authenticated"]);

        return response.redirect("/posts");
    }

    public static showRegisterationForm(request: Request, response: Response) {

        return response.render("auth/register.hbs", {
            authenticated: request["authenticated"],
            title: "Register",
            url: "/register",
        });
    }

    public static register(request: Request, response: Response) {

        return response.redirect("/posts");
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
            return response.redirect("/login");
        });
    }
}
