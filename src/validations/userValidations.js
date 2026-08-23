import { body } from "express-validator";

export const userValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    body("email")
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("El email no es valido")
        ,
    body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
];