import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function generateToken(_id) {
  try {
    await userModel.findById(_id).select("-password");

    const token = jwt.sign(
      {
        _id: _id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
    return token;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while generating token",
    });
  }
}
