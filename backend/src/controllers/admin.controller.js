import { uploadOnCloudinary } from "../config/cloudinary.js";
import { adminModel } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { courseModel } from "../models/course.model.js";

export async function adminLogin(req, res) {
  const loginCode = String(req.body.loginCode || "").trim();

  if (!loginCode) {
    return res.status(400).json({
      success: false,
      message: "Login code is required",
    });
  }

  if (loginCode !== process.env.ADMIN_LOGIN_CODE) {
    return res.status(400).json({
      success: false,
      message: "Incorrect login code",
    });
  }

  try {
    const existingAdmin = await adminModel.findOne();

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin already present",
      });
    }

    const admin = await adminModel.create({
      loginCode,
    });

    const adminToken = jwt.sign(
      {
        _id: admin._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(201).json({
      success: true,
      message: "Admin LoggedIn successfully",
      token: adminToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
}
export async function createCourse(req, res) {
  const { title, description, category, level, price, ratings = 0 } = req.body;

  if (!title || !description || !category || !level || !price || !ratings) {
    return res.status(400).json({
      success: false,
      message: "Input fields are required",
    });
  }

  const { thumbnail, videos } = req.files;

  try {
    if (!thumbnail || !videos || videos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Both thumbnail and at least one video are required.",
      });
    }

    const thumbnailPath = req.files.thumbnail?.[0].path;
    const videoPath = req.files.videos?.map((file) => file.path);

    if (!thumbnailPath || !videoPath || videoPath.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Both thumbnail and at least one video are required.",
      });
    }
    const uploadThumbnail = await uploadOnCloudinary(thumbnailPath);
    const uploadVideos = await Promise.all(
      videoPath.map((path) => uploadOnCloudinary(path))
    );

    const newCourse = new courseModel({
      title,
      description,
      category,
      level,
      price,
      ratings,
      thumbnail: uploadThumbnail.url,
      videos: uploadVideos.map((video) => video.url),
      instructor: req.admin._id,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully!",
      course: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload and create course",
      error: error.message,
    });
  }
}
export async function getAllCourses(req, res) {
  try {
    const courses = await courseModel.find({}).populate("instructor");
    if (!courses) {
      return res.status(400).json({
        success: false,
        message: "No courses found",
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}
export async function updateCourse(req, res) {
  const { id } = req.params;
  const { title, description, category, level, price, ratings = 0 } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Course id is required",
    });
  }

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (category !== undefined) updates.category = category;
  if (level !== undefined) updates.level = level;
  if (price !== undefined) updates.price = price;
  if (ratings !== undefined) updates.ratings = ratings;

  try {
    const updatedCourse = await courseModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCourse) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
}
export async function removeCourse(req, res) {
  const { id } = req.params;
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(400).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course removed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove course",
      error: error.message,
    });
  }
}
