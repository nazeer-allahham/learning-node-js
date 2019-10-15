import { Request, Response, Router } from "express";

import { AuthController } from "../controllers/auth-controller";
import isAuthenticated from "../middlewares/isAuthenticated";
import { CommentsController } from "./../controllers/comments-controller";
import { PostsController } from "./../controllers/posts-controller";
import { UsersController } from "./../controllers/users-controller";

const router = Router();

router.get("/auth/login", AuthController.showLoginForm);
router.post("/auth/login", AuthController.login);
router.get("/auth/register", AuthController.showRegisterationForm);
router.post("/auth/register", AuthController.register);
router.get("/auth/resetPassword", AuthController.resetPassword);
router.post("/auth/logout", AuthController.logout);

router.get("/users", [isAuthenticated, UsersController.index]);
router.get("/users/create", [isAuthenticated, UsersController.create]);
router.post("/users/create", [isAuthenticated, UsersController.save]);
router.get("/users/:id/edit", [isAuthenticated, UsersController.edit]);
router.post("/users/:id/edit", [isAuthenticated, UsersController.update]);
router.get("/users/:id/remove", [isAuthenticated, UsersController.destroy]);

router.get("/posts", [isAuthenticated, PostsController.index]);
router.get("/posts/create", [isAuthenticated, PostsController.create]);
router.post("/posts/create", [isAuthenticated, PostsController.save]);
router.post("/posts/:id", [isAuthenticated, PostsController.show]);
router.get("/posts/:id/edit", [isAuthenticated, PostsController.edit]);
router.post("/posts/:id/edit", [isAuthenticated, PostsController.update]);
router.get("/posts/:id/remove", [isAuthenticated, PostsController.destroy]);

router.get("/comments", [isAuthenticated, CommentsController.index]);
router.post("/comments/create", [isAuthenticated, CommentsController.save]);
router.post("/comments/:id/edit", [isAuthenticated, CommentsController.update]);
router.get("/comments/:id/remove", [isAuthenticated, CommentsController.destroy]);

router.get("/", [isAuthenticated, (req: Request, res: Response) => {
    if (req["authenticated"]) {
        res.redirect("/posts");
    } else {
        res.redirect("/auth/login");
    }
}]);

export default router;
