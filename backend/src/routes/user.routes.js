import express from "express";
import {
  signup,
  login,
  logout,
  getAllUsers,
  updateUsers,
  removeUsers,
} from "../controllers/user.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

//admin protected routes
userRouter.get("/get-users", adminAuth, getAllUsers);
userRouter.put("/update-user/:id", adminAuth, updateUsers);
userRouter.delete("/remove-user/:id", adminAuth, removeUsers);
