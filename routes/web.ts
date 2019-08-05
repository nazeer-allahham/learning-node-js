import { Router } from "express";

import { AuthController } from "../controllers/auth-controller";
import { CommentsController } from "./../controllers/comments-controller";
import { PostsController } from "./../controllers/posts-controller";
import { UsersController } from "./../controllers/users-controller";

const router = Router();

router.get("/login", AuthController.showLoginForm);
router.post("/login", AuthController.login);
router.get("/register", AuthController.showRegisterationForm);
router.post("/register", AuthController.register);
router.get("/resetPassword", AuthController.resetPassword);
router.post("/logout", AuthController.logout);

router.get("/users", UsersController.index);
router.get("/users/create", UsersController.create);
router.post("/users/create", UsersController.save);
router.get("/users/:id/edit", UsersController.edit);
router.post("/users/:id/edit", UsersController.update);
router.get("/users/:id/remove", UsersController.destroy);

router.get("/posts", PostsController.index);
router.get("/posts/create", PostsController.create);
router.post("/posts/create", PostsController.save);
router.post("/posts/:id", PostsController.show);
router.get("/posts/:id/edit", PostsController.edit);
router.post("/posts/:id/edit", PostsController.update);
router.get("/posts/:id/remove", PostsController.destroy);

router.get("/comments", CommentsController.index);
router.post("/comments/create", CommentsController.save);
router.post("/comments/:id/edit", CommentsController.update);
router.get("/comments/:id/remove", CommentsController.destroy);

router.get("/comments/:id/remove", CommentsController.destroy);
router.get("/comments/:id/remove", CommentsController.destroy);

router.get("/", (req, res, next) => {
    if (req["authenticated"]) {
        res.redirect("/posts");
    } else {
        res.redirect("/login");
    }
});

export default router;
