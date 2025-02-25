import express from "express";
import {
  signup,
  login,
  logout,
  getAllUsers,
  updateUsers,
  removeUsers,
  purchaseCourse,
  getAllEnrolledUsersInCourse,
  userEnrolledCourses,
  postReviews,
  getReviews,
} from "../controllers/user.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);

// user protected routes
userRouter.post("/logout", auth, logout);
userRouter.post("/buy-course/:courseId", auth, purchaseCourse);
userRouter.get("/enrollments", auth, userEnrolledCourses);

//admin protected routes
userRouter.get("/get-users", adminAuth, getAllUsers);
userRouter.put("/update-user/:id", adminAuth, updateUsers);
userRouter.delete("/remove-user/:id", adminAuth, removeUsers);
userRouter.get(
  "/enrollments/:courseId",
  adminAuth,
  getAllEnrolledUsersInCourse
);

// reviews

userRouter.post("/course/:courseId/review", auth, postReviews);

userRouter.get("/course/:courseId/reviews", getReviews);
