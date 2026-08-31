import { personalDataValidations, updatePersonalDataValidations} from "../validations/personalDataValidations.js";
import { validate } from "../middlewares/validate.js";
import express from "express";

import { createPersonalData, getPersonalData, getPersonalDataById, updatePersonalData, deletePersonalData } from "../controller/personalDataController.js";

export const router = express.Router();

router.post("/", personalDataValidations, validate, createPersonalData);
router.get("/", getPersonalData);
router.get("/:id", getPersonalDataById)
router.put("/:id", updatePersonalDataValidations, validate, updatePersonalData )
router.delete("/:id", deletePersonalData)
