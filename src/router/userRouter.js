import express from "express";

import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controller/userController.js";

import {
    userValidations,
    userIdValidation,
    updateUserValidations
} from "../validations/userValidations.js";

import { validate } from "../middlewares/validate.js";

export const router = express.Router();

router.post("/", userValidations, validate, createUser);
router.get("/", getUsers);
router.get("/:id", userIdValidation, validate, getUserById);
router.put("/:id", userIdValidation , updateUserValidations , validate , updateUser);
router.delete("/:id", userIdValidation, validate, deleteUser);