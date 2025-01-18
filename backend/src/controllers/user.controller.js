import { loginSchema, signupSchema } from "../utils/zodSchema.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
  const requiredBody = signupSchema.safeParse(req.body);
  if (!requiredBody.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid input fields",
    });
  }

  const { name, email, password } = req.body;

  try {
    const emailAlreadyExists = await userModel.findOne({
      email,
    });

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
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Ivalid credentials",
      });
    }

    const verifyingPassword = await bcrypt.compare(password, user.password);

    if (!verifyingPassword) {
      return res.status(400).json({
        success: false,
        message: "Ivalid credentials",
      });
    }

    const token = await generateToken(user._id);

    const loggedInUser = await userModel
      .findOne(user._id)
      .select("-refreshToken -password");

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "User loggedIn successfully",
        user: loggedInUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong when logging in",
    });
  }
}

export async function logout(req, res) {}

//admin protected routes
export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({}).select("-password");
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "No users present",
      });
    }

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong while fetching users",
      error: error.message,
    });
  }
}

export async function updateUsers(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is needed",
    });
  }
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
}

export async function removeUsers(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Id is needed",
    });
  }
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
}
