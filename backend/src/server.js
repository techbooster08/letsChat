import express from "express";
import "dotenv/config";
import apiV1Routes from "./routes/apiV1.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
const port = ENV.PORT;
const __dirname = path.resolve();

// Middleware
app.use(express.json());

app.use("/api/v1", apiV1Routes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
