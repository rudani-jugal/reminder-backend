import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  remindAt: { type: Date, required: true },
  sent: { type: Boolean, default: false }
});

export default mongoose.model("Reminder", reminderSchema);
