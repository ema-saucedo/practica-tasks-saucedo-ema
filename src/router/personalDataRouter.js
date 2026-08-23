import { personalDataValidations } from "../validations/personalDataValidations.js";
import { validate } from "../middlewares/validate.js";
import express from "express";

import { createPersonalData, getPersonalData } from "../controller/personalDataController.js";

export const router = express.Router();

router.post("/", personalDataValidations, validate, createPersonalData);
router.get("/", getPersonalData);
