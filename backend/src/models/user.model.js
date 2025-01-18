import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      lowercase: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [2, "Email must be at least 2 characters"],
      maxlength: [250, "Email cannot exceed 250 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 2 characters"],
      maxlength: [100, "Password cannot exceed 100 characters"],
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "Student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", userSchema);
