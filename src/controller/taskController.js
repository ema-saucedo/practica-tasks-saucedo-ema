import { Task, User } from "../model/index.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, isComplete, user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({
                message: "Debe indicar el usuario dueño de la tarea",
            });
        }

        const userExists = await User.findByPk(user_id);
        if (!userExists) {
            return res.status(404).json({
                message: "El usuario indicado no existe",
            });
        }

        const task = await Task.create({
            title,
            description,
            isComplete,
            user_id,
        });

        res.status(201).json({
            message: "Tarea Creada",
            task,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message,
        });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todas las tareas",
            error: error.message,
        });
    }
};

export const getTaskId = async (req, res) => {
    try {
        const { id } = req.params;

        const taskId = await Task.findByPk(id, {
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
        });

        if (!taskId) {
            return res.status(404).json({
                message: "Tarea no encontrada",
            });
        }

        res.status(200).json(taskId);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la tarea",
            error: error.message,
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const { title, description, isComplete } = req.body;

        const taskUpdate = await Task.findByPk(id);

        if (!taskUpdate) {
            return res.status(404).json({
                message: "Tarea no encontrada",
            });
        }

        await taskUpdate.update({
            title,
            description,
            isComplete,
        });

        res.status(200).json({
            message: "Tarea Actualizada",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la tarea",
            error: error.message,
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const taskDelete = await Task.findByPk(id);

        if (!taskDelete) {
            return res.status(404).json({
                message: "Tarea no encontrada",
            });
        }

        await taskDelete.destroy();

        res.status(200).json({
            message: "Tarea eliminada correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la tarea",
            error: error.message,
        });
    }
};
