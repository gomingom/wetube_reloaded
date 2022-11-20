import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter
  .route("/edit-user")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadAvatar.single("avatar"), postEdit);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id", protectorMiddleware, see);

export default userRouter;
