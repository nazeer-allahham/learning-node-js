import { Request, Response } from "express";

import { Attachment } from "./../models/attachment";
import { Post } from "./../models/post";
import { IController } from "./controller";

export class PostsController implements IController {
    public static index(request: Request, response: Response, next: any) {
        Post.findAll()
            .then((posts: Post[]) => {
                return response.render("posts/index.hbs", {
                    authenticated: request["authenticated"],
                    layout: "app",
                    posts,
                });
            })
            .catch((err: any) => {
                console.error(PostsController.LOG, "cannot to restore posts from database", err);
            });
    }

    public static create(request: Request, response: Response, next: any) {
        response.render("posts/create.hbs", {
            actionTitle: "post",
            authenticated: request["authenticated"],
            title: "New post",
            url: "/posts/create",
        });
    }

    public static save(request: Request, response: Response, next: any) {
        const title = request.body.title;
        const body = request.body.body;
        const attachments = request.body.attachments;

        // some validation MM
        console.log(title, body, attachments);

        request["user"].createPost({
            body,
            title,
        }).then((data: any) => {
            console.log(data);

            const bulkData: any[] = [];
            attachments.forEach((a: any) => {
                bulkData.push({
                    postId: data.id,
                    relatedTo: "post",
                    url: a,
                });
            });

            return Attachment.bulkCreate(bulkData);

        }).then((res: any) => {
            console.log(res);
            return response.redirect("/posts");

        }).catch((err: any) => {
            console.error(PostsController.LOG, "cannot to create post successfully", err);
            return response.redirect("/posts/create");
        });
    }

    public static show(request: Request, response: Response, next: any) {
        console.log("SHOW");
        response.send();
    }

    public static edit(request: Request, response: Response, next: any) {
        console.log("edit");
        response.send();
    }
    public static update(request: Request, response: Response, next: any) {
        console.log("update");
        response.send();
    }

    public static destroy(request: Request, response: Response, next: any) {
        console.log("destroy");
        response.send();
    }

    private static LOG: string = "PostsController";
}
