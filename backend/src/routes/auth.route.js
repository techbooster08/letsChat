import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {});

router.post("/signup", (req, res) => {});

router.get("/logout", (req, res) => {
  res.send("Logout route");
});

export default router;
