import { Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.use(authMiddleware);
router.get("/check", (req, res) => {
  res.status(200).json(req.user);
});

export default router;
