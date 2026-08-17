import express from "express";

import { createPersonalData, getPersonalData } from "../controllers/personalDataController.js";

export const router = express.Router();

router.post("/", createPersonalData);
router.get("/", getPersonalData);


