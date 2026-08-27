import { matchedData } from "express-validator";
import { User, Task } from "../model/index.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            message: "error al crear el usuaio",
            error: error.message,
        });
    }
};
export const getUsers = async (req, res) => {
    try {

        const users = await User.findAll({
            include: [{ model: Task, as: "tasks" }],
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "error al obtener los usuarios",
            error: error.message,
        });
    }
};
export const getUserById = async (req, res) => {
    try {

        const { id } = req.params;


        const user = await User.findByPk(id, {
            include: [{ model: Task, as: "tasks" }],
        });


        if (!user) {

            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el usuario",
            error: error.message,
        });
    }
};
export const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
//matchedData tiene unicamente como objetivo tomar los datos que pasaron por las validaciones. Esto permite que se pueda trabajar con datos validados en vez de mandar datos que no sepamos si estan bien validados.
        const data = matchedData(req);

        await user.update(data);
        return res.status(200).json({
            message: "Usuario actualizado con exito.",
            user
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Error al actualizar el usuario"
        });
    }
};
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        await user.destroy();
        res.status(200).json({
            message: "Usuario eliminado correctamente"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al elimnar el usuario",
        });
    }
};
