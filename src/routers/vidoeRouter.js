import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  upload,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// videoRouter.get("/upload", upload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .all(protectorMiddleware)
  .get("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);

export default videoRouter;
