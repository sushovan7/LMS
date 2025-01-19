import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentDate: { type: Date, default: Date.now },
    progress: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
