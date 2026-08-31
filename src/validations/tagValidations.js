import { body } from "express-validator";
import { tag } from "../model/tag.js";

export const tagValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 12 })
        .withMessage("El nombre debe tener como maximo 12 caracteres")
        .custom(async (name) => {
            const tagExists = await tag.findOne({
                where: { name: name }
            });

            if (tagExists) {
                throw new Error("El tag ya existe");
            }

            return true;
        })
];
export const updateTagValidations = [

    body("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")

];