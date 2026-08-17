import express from "express";

import { createPersonalData, getPersonalData } from "../controller/personalDataController.js";

export const router = express.Router();

router.post("/", createPersonalData);
router.get("/", getPersonalData);
