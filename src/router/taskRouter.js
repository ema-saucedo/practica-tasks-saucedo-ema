import {
  taskValidations,
  taskIdValidation,
  updateTaskValidations
} from "../validations/taskValidations.js";
import { validate } from "../middlewares/validate.js";
import express from "express";
import {
  createTask,
  getTasks,
  getTaskId,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

export const router = express.Router();
router.post("/", taskValidations, validate, createTask);
router.get("/", getTasks);
router.get("/:id", taskIdValidation, validate, getTaskId);
router.put("/:id", taskIdValidation, updateTaskValidations, validate, updateTask);
router.delete("/:id", taskIdValidation, validate, deleteTask);
