import mongoose from "mongoose";

// Define the Course Schema with multiple videos
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "WebDevelopment",
        "MobileAppDevelopment",
        "DataScienceMachineLearning",
        "Cybersecurity",
        "GameDevelopment",
        "DevOpsCloudComputing",
        "ArtificialIntelligence",
        "DatabaseManagementSQL",
        "SoftwareTestingQA",
        "BlockchainDevelopment",
      ],
    },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    videos: {
      type: Array,
      required: true,
    },
    studentsEnrolled: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
  },
  { timestamps: true }
);

export const courseModel = mongoose.model("Course", courseSchema);
