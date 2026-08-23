import { userValidations } from "../validations/userValidations.js";
import { validate } from "../middlewares/validate.js";
import express from "express"
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controller/userController.js';

export const router = express.Router();
router.post("/", userValidations, validate, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
