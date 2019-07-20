import { Request, Response } from "express";

export class ErrorsController {
    constructor() {

    }

    /**
     * 404
     */
    public static pageNotFound404(request: Request, response: Response) {
        // response.sendFile(env.basePath + '\\views\\errors\\404.html');

        response.status(404)
                .render('errors/404.pug', {});
    }
}