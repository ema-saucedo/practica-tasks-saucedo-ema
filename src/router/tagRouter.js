import express from "express";

import { createTag, getTags } from "../controller/tagController.js";

export const router = express.Router();

router.post("/", createTag);
router.get("/", getTags);
