import express from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import {
  createCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
} from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

export const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

// admin prodected routed

adminRouter.post("/create-courses", adminAuth, createCourse);
adminRouter.get("/all-courses", adminAuth, getAllCourses);
adminRouter.put("/update-course/:id", adminAuth, updateCourse);
adminRouter.delete("/remove-course/:id", adminAuth, removeCourse);
