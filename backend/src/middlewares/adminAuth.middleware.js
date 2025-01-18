import jwt from "jsonwebtoken";
import { adminModel } from "../models/admin.model.js";

export async function adminAuth(req, res, next) {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodeToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Incorrect token",
      });
    }

    const admin = await adminModel.findById(decodeToken._id);
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid or Incorrect token",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
