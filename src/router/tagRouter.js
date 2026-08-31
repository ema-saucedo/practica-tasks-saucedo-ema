import express from "express";
import { createTag, getTags,getTagById, updateTag, deleteTag } from "../controller/tagController.js";
import { tagValidations, updateTagValidations } from "../validations/tagValidations.js";
import { validate } from "../middlewares/validate.js";

export const router = express.Router();

router.post("/", tagValidations, validate, createTag);
router.get("/", getTags);
router.get("/:id", getTagById);
router.put("/:id", updateTagValidations, validate, updateTag)
router.delete("/:id", deleteTag)
