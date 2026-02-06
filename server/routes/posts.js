import express from "express";
import Post from "../models/Post.js";
import { deletePost } from "../controllers/generateController.js";

const router = express.Router();

// Get posts for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});
router.delete("/:id", deletePost);
export default router;
