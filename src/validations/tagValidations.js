import { body } from "express-validator";
import { tag } from "../model/tag.js";

export const tagValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isLength({ max: 8 })
        .withMessage("El nombre debe tener como maximo 8 caracteres")
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