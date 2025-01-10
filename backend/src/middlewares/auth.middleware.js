import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export async function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "token is needed",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(400).json({
        success: false,
        meaage: "Invalid or expired token",
      });
    }

    const user = await userModel.findById(decodedToken._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while authenticating" + error,
    });
  }
}
