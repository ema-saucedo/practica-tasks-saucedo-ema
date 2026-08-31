import { body } from "express-validator";
import { personalData } from "../model/personalData.js";

export const personalDataValidations = [
    body("dni")
        .notEmpty()
        .withMessage("El DNI es obligatorio")
        .isLength({ min: 7, max: 8 })
        .withMessage("El DNI debe tener entre 7 y 8 caracteres")
        .custom(async (dni) => {
            const data = await personalData.findOne({
                where: { dni: dni }
            });

            if (data) {
                throw new Error("El DNI ya esta registrado");
            }

            return true;
        }),

    body("birthDate")
        .notEmpty()
        .withMessage("La fecha de nacimiento es obligatoria")
        .isLength({ min: 10, max: 10 })
        .withMessage("La fecha debe tener 10 caracteres"),

    body("address")
        .notEmpty()
        .withMessage("La direccion es obligatoria")
];

export const updatePersonalDataValidations = [

    body("dni")
        .optional()
        .isLength({ min: 7, max: 8 })
        .withMessage("El DNI debe tener entre 7 y 8 caracteres"),

    body("birthDate")
        .optional()
        .isLength({ min: 10, max: 10 })
        .withMessage("La fecha debe tener 10 caracteres"),

    body("address")
        .optional()
        .notEmpty()
        .withMessage("La direccion no puede estar vacia")

];