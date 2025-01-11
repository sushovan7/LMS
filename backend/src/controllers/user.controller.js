import { loginSchema, signupSchema } from "../utils/zodSchema.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const requiredBody = signupSchema.safeParse(req.body);
  if (!requiredBody.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input fields",
    });
  }

  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    const emailAlreadyExists = await userModel.findOne({
      email,
    });
    console.log(emailAlreadyExists);

    if (emailAlreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const userCreated = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const user = await userModel.findById(userCreated._id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User creation failed",
      });
    }

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in registering user",
    });
  }
}

export async function login(req, res) {
  const requiredBody = loginSchema.safeParse(req.body);
  if (!requiredBody.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input fields",
    });
  }

  const { email, password } = req.body;

  try {
    const verifyingUser = await userModel.findOne({
      email,
    });

    if (!verifyingUser) {
      return res.status(400).json({
        success: false,
        message: "Ivalid credentials",
      });
    }

    const verifyingPassword = await bcrypt.compare(
      password,
      verifyingUser.password
    );

    if (!verifyingPassword) {
      return res.status(400).json({
        success: false,
        message: "Ivalid credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: verifyingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong when logging in",
    });
  }
}

export async function logout(req, res) {}
