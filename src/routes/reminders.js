import express from "express";
import Reminder from "../models/reminder.js";
import { authMiddleware } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.post("/create-reminders", authMiddleware, async (req, res) => {
  try {
    const reminder = await Reminder.create({ ...req.body, userId: req.userId });
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/fetch-reminders", authMiddleware, async (req, res) => {
  const reminders = await Reminder.find({ userId: req.userId }).sort({ remindAt: 1 });
  res.json(reminders);
});


router.put("/update-reminders", authMiddleware, async (req, res) => {
  try {
    const { _id } = req.body;

    const reminder = await Reminder.findOneAndUpdate(
      { _id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found or not authorized" });
    }

    res.json(reminder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete-reminders/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await Reminder.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!reminder) {
      return res.status(404).json({ error: "Reminder not found or not authorized" });
    }

    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
