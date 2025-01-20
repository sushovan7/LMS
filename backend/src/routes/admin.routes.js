import express from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
} from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

export const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

// admin prodected routed

adminRouter.post(
  "/create-course",
  adminAuth,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "videos",
      maxCount: 1,
    },
  ]),
  createCourse
);
adminRouter.get("/all-courses", adminAuth, getAllCourses);
adminRouter.get("/single-course/:courseId", adminAuth, getSingleCourse);
adminRouter.put("/update-course/:courseId", adminAuth, updateCourse);
adminRouter.delete("/remove-course/:courseId", adminAuth, removeCourse);
