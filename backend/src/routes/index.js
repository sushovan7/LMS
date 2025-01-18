import express from "express";
import { userRouter } from "./user.routes.js";
import { adminRouter } from "./admin.routes.js";
export const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/admin", adminRouter);
