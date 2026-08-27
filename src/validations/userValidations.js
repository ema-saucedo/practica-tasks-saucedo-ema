import { body, param } from "express-validator";
import { modelUser } from "../model/modelUser.js";

export const userValidations = [
    body("name")
    .optional()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    body("email")
    .optional()
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
export const userIdValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("El id debe ser un entero positivo")
        .custom(async (id) => {
            const user = await modelUser.findByPk(id);

            if (!user) {
                throw new Error("El usuario no existe");
            }

            return true;
        })
];
export const updateUserValidations = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede estar vacio"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("El email no es valido")
        .custom(async (email, { req }) => {
            const user = await modelUser.findOne({
                where: { email: email }
            });

            if (user && user.id !== Number(req.params.id)) {
                throw new Error("El email ya esta registrado");
            }

            return true;
        }),

    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener al menos 6 caracteres")
];