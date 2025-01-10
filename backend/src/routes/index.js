import express from "express";
import { userRouter } from "./user.routes.js";
export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
