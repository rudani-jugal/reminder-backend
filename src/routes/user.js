import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authMiddleWare.js";

const router = express.Router();

router.get("/fetch-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/update-user", authMiddleware, async (req, res) => {
  try {
    const { _id, firstName, lastName, email, password } = req.body;
    const updateFields = { firstName, lastName, email };

    if (password && password.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  

export default router;
