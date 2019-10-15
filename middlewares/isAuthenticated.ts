import { Request, Response } from "express";
import { User } from "./../models/user";

function resolve(request: Request, next: any, user: any = request.session!["user"]): void {
    request["authenticated"] = request.session!["authenticated"];
    request["token"] = request.session!["token"];
    request["user"] = user;
    console.log("request.session['authenticated']", [
        request["authenticated"],
        request["token"],
        request["user"],
    ]);
    console.info("AUTHENTICATION_MIDDLEWARE => ", "User authentication status", request["authenticated"]);
    next();
}

function reject(err: string, request: Request, response: Response): void {
    console.error("AUTHENTICATION_MIDDLEWARE => ", err);
    request["authenticated"] = false;
    request["user"] = undefined;
    console.info("AUTHENTICATION_MIDDLEWARE => ", "User redirecting to login page");
    // response.redirect("/auth/login");

    response.render("auth/login.hbs", {
        authenticated: false,
        errors: [
            "Un authorized user",
            err,
        ],
        title: "Login",
        url: "/auth/login",
    });

    // return response.json({
    //   message: "Un authorized user",
    //   status: "error",
    // });
}

export default (request: Request, response: Response, next: any) => {
    // Using the normal Cookie
    // request["authenticated"] = ((request.get("Cookie") as string) + "").split(";").some((e: string) => {
    //   const [key, value] = e.split("=");
    //   return key === "authenticated" && value === "true";
    // });

    // UsingSession
    if (!request.session) {
        reject("Session expired", request, response);
    } else {
        if (request.session["user"] !== undefined) {
            resolve(request, next);
        } else {
            console.log("tokenOfAuthenticatedUser", request.session["token"]);
            User.findByPk(request.session["token"])
                .then((user: any) => {
                    console.log(user);
                    if (user) {
                        resolve(request, next, user);
                    } else {
                        reject("Invalid user token", request, response);
                    }
                });
        }
    }
};
