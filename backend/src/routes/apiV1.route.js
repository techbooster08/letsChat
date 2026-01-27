import { Router } from "express";
import authRoutes from "./auth.route.js";
import messageRoutes from "./message.route.js";
import profileRoutes from "./profile.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/profile", profileRoutes);
router.use("/message", messageRoutes);

export default router;
