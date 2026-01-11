import express from "express";
import "dotenv/config";
import apiV1Routes from "./routes/apiV1.route.js";
import path from "path";

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/v1", apiV1Routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
