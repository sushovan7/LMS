import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    enrollmentDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);

export const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
