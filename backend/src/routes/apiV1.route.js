import { Router } from "express";
import authRoutes from "./auth.route.js";
import messageRoutes from "./message.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/message", messageRoutes);

export default router;
