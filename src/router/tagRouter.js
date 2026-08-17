import express from "express";

import { createTag, getTags } from "../controllers/tagController.js";

export const router = express.Router();

router.post("/", createTag);
router.get("/", getTags);


