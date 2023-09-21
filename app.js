import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
app.use(express.json());

import userRouter from "./routes/userRoutes.js";
app.use("/user", userRouter);
import blogRouter from "./routes/blogRoutes.js";
app.use("/blog", blogRouter);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => console.log("Database opened"));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log("Server started");
});
