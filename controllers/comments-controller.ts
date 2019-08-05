import { Request, Response } from "express";

import { Comment } from "./../models/comment";
import { IController } from "./controller";

export class CommentsController implements IController {
    public static index(request: Request, res: Response, next: any) {
        throw new Error("FunctionNotImplemented");
    }

    public static save(request: Request, response: Response, next: any) {
        const description: string = request.body.description;
        const postId: number = request.body.postId;

        const authorId = request["user"].id;

        // some validation

        Comment.create({
            authorId,
            description,
            postId,
        }).then((result: any) => {
            console.log(result);
            response.redirect("/posts");
        }).catch((err: any) => {
            console.error(err);
            response.redirect("/posts");
        });
    }

    public static update(request: Request, res: Response, next: any) {
        throw new Error("FunctionNotImplemented");
    }

    public static destroy(request: Request, res: Response, next: any) {
        throw new Error("FunctionNotImplemented");
    }

}
