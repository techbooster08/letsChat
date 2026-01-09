import express from "express";
import "dotenv/config";
import apiV1Routes from "./routes/apiV1.route.js";

const app = express();
const port = process.env.PORT;

app.use("/api/v1", apiV1Routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
