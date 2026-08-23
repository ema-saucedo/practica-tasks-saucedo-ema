import express from "express";
import { createTag, getTags } from "../controller/tagController.js";
import { tagValidations } from "../validations/tagValidations.js";
import { validate } from "../middlewares/validate.js";

export const router = express.Router();

router.post("/", tagValidations, validate, createTag);
router.get("/", getTags);
