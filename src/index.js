import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/dbConfig.js";
import authRoutes from "./routes/auth.js";
import reminderRoutes from "./routes/reminders.js";
import userRoutes from "./routes/user.js";
import "./scheduler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/user", userRoutes);

mongoose.connect(config.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(config.PORT, () => console.log(`🚀 Server running on ${config.PORT}`));
  })
  .catch(err => console.error("MongoDB error:", err));
