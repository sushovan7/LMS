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

// const CourseSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   instructorId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to Admin
//   content: [
//     {
//       id: { type: String, required: true },
//       title: { type: String, required: true },
//       videoUrl: { type: String },
//       duration: { type: Number } // Duration in minutes
//     }
//   ],
//   enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to Students
//   rating: { type: Number, default: 0 }, // Average rating
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Course', CourseSchema);
