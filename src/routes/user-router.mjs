import express from "express";
import {deleteUser, getUserById, getUsers, postUser, putUser} from "../controllers/user-controller.mjs";

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);
userRouter.route(':id')
    .get(getUserById)
    .put(putUser)
    .delete(deleteUser)
;


export default userRouter;