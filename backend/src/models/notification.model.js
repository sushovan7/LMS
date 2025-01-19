import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the recipient
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["info", "reminder", "warning"],
    default: "info",
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const notificationModel = mongoose.model(
  "Notification",
  notificationSchema
);
