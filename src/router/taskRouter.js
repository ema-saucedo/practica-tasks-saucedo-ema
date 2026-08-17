import express from "express";
import { createTask, getTasks, getTaskId, updateTask, deleteTask } from "../controller/taskController.js";

export const router = express.Router();
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskId);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

