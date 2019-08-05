import { Request, Response } from "express";

import { IController } from "./controller";

export class ErrorsController implements IController {
    /**
     * 404
     */
    public static pageNotFound404(request: Request, response: Response, next: any) {
        // response.sendFile(env.basePath + '\\views\\errors\\404.html');

        response.status(404)
            .render("errors/404.hbs");
    }
}
