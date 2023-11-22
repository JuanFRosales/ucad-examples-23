import express from "express";
import { getMe } from "../controllers/auth-controller.mjs";
import { postLogin } from "../controllers/auth-controller.mjs";
import { authenticateToken } from "../middlewares/authentication.mjs"


const authRouter = express.Router();

authRouter.route('/login').post(postLogin);
authRouter.route('/me').get(authenticateToken, getMe);





export default authRouter;