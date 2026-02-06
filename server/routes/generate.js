import express from "express";
import { generatePost } from "../controllers/generateController.js";

const router = express.Router();

router.post("/", generatePost);

export default router;
