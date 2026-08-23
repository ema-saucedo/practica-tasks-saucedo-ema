import { body, param } from "express-validator";
import { Task } from "../model/modelTask.js";

export const taskValidations = [
    body("title")
        .notEmpty()
        .withMessage("El titulo es obligatorio")
        .custom(async (title) => {
            const task = await Task.findOne({
                where: { title: title }
            });

            if (task) {
                throw new Error("El titulo ya esta registrado");
            }

            return true;
        }),

    body("description")
        .notEmpty()
        .withMessage("La descripcion es obligatoria"),

    body("isComplete")
        .optional()
        .isBoolean()
        .withMessage("isComplete debe ser un valor booleano")
];

export const taskIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id debe ser un entero positivo")
        .custom(async (id) => {
            const task = await Task.findByPk(id);

            if (!task) {
                throw new Error("La tarea no existe");
            }

            return true;
        })
];