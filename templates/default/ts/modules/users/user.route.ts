/**
 * @example Route registry file for user module: user.route.js
 * This file containes code to be refered as example for module.route files
 * @exports userRouter express router is to be exported
 * 
 */
import { Router } from "express";
import { getAllUser, returnSelf } from "./user.controller";

const userRouter = Router();

userRouter.get("/single/:id", returnSelf);

userRouter.get("/getAll", getAllUser)
/**
 * @readonly most likely above method used using middleware
 * @example router.get("/me", verifyAuth, returnSelf);
 * 
 */

export default userRouter;