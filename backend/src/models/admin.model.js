import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "Sushovan",
    },
    role: {
      type: String,
      default: "admin",
    },
    loginCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const adminModel = mongoose.model("Admin", adminSchema);
