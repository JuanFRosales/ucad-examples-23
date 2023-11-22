import express from "express";
import multer from "multer";
import {
  deleteMedia,
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
} from "../controllers/media-controller.mjs";
import logger from "../middlewares/middleware.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs";

const mediaRouter = express.Router();
const upload = multer({dest: 'uploads/'})

//Router specific 
//mediaRouter.use(logger);

//TODO: check and add authentication where needed

mediaRouter.route("/")
    .get(getMedia)
    .post(authenticateToken, upload.single('file'), postMedia);
mediaRouter.route(":id")
    .get(getMediaById)
    .put(putMedia)
    .delete(deleteMedia);

export default mediaRouter;
