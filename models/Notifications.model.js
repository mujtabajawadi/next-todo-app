import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({ userId: 1, isRead: 1 });

const Notification =
  mongoose.models?.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
