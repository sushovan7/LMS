import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const reviewModel = mongoose.model("Review", reviewSchema);
