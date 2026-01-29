import { Router } from "express";
import authRoutes from "./auth.route.js";
import messageRoutes from "./message.route.js";
import profileRoutes from "./profile.route.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { arcJetMiddleware } from "../middleware/arcjet.middleware.js";

const router = Router();

router.use(arcJetMiddleware);

router.get("/test", (_, res) => res.json({ message: "API V1 is working!" }));

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/profile", profileRoutes);
router.use("/message", messageRoutes);

export default router;
