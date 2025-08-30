import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ msg: "No token" });
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch {
      return res.status(401).json({ msg: "Invalid token" });
    }
  }