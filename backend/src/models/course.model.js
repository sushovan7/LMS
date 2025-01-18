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
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    videos: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true }, // URL of the video or file path
        description: { type: String, required: false },
        length: { type: Number, required: false }, // Video duration in minutes (optional)
      },
    ],
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
