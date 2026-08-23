import { body } from "express-validator";
import { modelUser } from "../model/modelUser.js";

export const userValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email no es valido")
    .custom(async (email) => {
        const user = await modelUser.findOne({
            where: { email: email }
        });

        if (user) {
            throw new Error("El email ya esta registrado");
        }

        return true;
    }),
    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
];