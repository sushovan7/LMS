import { adminModel } from "../models/admin.model.js";
import jwt from "jsonwebtoken";

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
      return res.status(400).json({
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
  const { title, description, category, level, price, ratings } = req.body;

  if (!title || !description || !category || !level || !price || !ratings) {
    return res.status(400).json({
      success: false,
      message: "Input fields are required",
    });
  }
}

export async function getAllCourses(req, res) {}
export async function updateCourse(req, res) {}
export async function removeCourse(req, res) {}
