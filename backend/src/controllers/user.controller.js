import { loginSchema, signupSchema } from "../utils/zodSchema.js";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import { courseModel } from "../models/course.model.js";
import { enrollmentModel } from "../models/enrollment.model.js";
import { reviewModel } from "../models/review.model.js";

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

export async function logout(req, res) {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    return res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "User Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to logged out",
      error: error.message,
    });
  }
}

export async function purchaseCourse(req, res) {
  const _id = req.user._id;
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId is required",
    });
  }

  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    user.enrolledCourses.push(course._id);
    course.studentsEnrolled.push(user._id);

    await user.save();
    await course.save();
    await enrollmentModel.create({
      studentId: user._id,
      courseId: course._id,
    });

    return res.status(200).json({
      success: true,
      message: "Course purchased successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to purchase course",
      error: error.message,
    });
  }
}

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

// enrollments

export async function getAllEnrolledUsersInCourse(req, res) {
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "courseId is required",
    });
  }

  try {
    const course = await courseModel.findById(courseId).populate({
      path: "studentsEnrolled",
      select: "-password",
    });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      studentsEnrolled: course.studentsEnrolled,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled students",
      error: error.message,
    });
  }
}

export async function userEnrolledCourses(req, res) {
  const { _id } = req.user._id;
  if (!_id) {
    return res.status(400).json({
      success: false,
      message: "Id is needed",
    });
  }
  try {
    const user = await userModel.findById(_id).populate({
      path: "enrolledCourses",
      select: "-password",
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users enrolled courses is found",
      courses: user.enrolledCourses,
    });
  } catch (error) {}
}

// reviews and feedback

export async function postReviews(req, res) {
  const { courseId } = req.params;
  const { rating, comment } = req.body;

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course id is required",
    });
  }
  if (rating === undefined && !comment) {
    return res.status(400).json({
      success: false,
      message: "At least a rating or comment is required",
    });
  }

  // Validate rating range
  if (rating !== undefined && (rating < 1 || rating > 5)) {
    return res.status(400).json({
      success: false,
      message: "Rating must be between 1 and 5",
    });
  }
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    const existingReview = await reviewModel.findOne({
      userId: user._id,
      courseId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    const reviews = await reviewModel.create({
      studentId: user._id,
      courseId,
      rating,
      comment,
    });
    return res.status(200).json({
      success: true,
      message: "Thank you for your review",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to upload review",
      error: error.message,
    });
  }
}

export async function getReviews(req, res) {
  const { courseId } = req.params;
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course id is required",
    });
  }

  try {
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const reviews = await reviewModel.find({
      courseId,
    });
    if (!reviews) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "reviews found",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
}
