import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invald token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
