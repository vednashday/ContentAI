import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import generateRoute from "./routes/generate.js";
import postsRoute from "./routes/posts.js";

const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// Routes
app.use("/api/generate", generateRoute);
app.use("/api/posts", postsRoute);
app.get("/", (req, res) => {
  res.send("GenAI Post Generator API is running");
});


// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
