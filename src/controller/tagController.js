import { Task, Tag } from "../model/index.js";

export const createTag = async (req, res) => {
    try {
        const { name, taskId } = req.body;


        if (!taskId) {
            return res.status(400).json({
                message: "Debe indicar la tarea a la que se le asigna la etiqueta",
            });
        }


        const taskExists = await Task.findByPk(taskId);

        if (!taskExists) {
            return res.status(404).json({
                message: "La tarea indicada no existe",
            });
        }

        const [tag] = await Tag.findOrCreate({
            where: { name },
        });

        await taskExists.addTag(tag);

        res.status(201).json({
            message: "Etiqueta asignada a la tarea",
            tag,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la etiqueta",
            error: error.message,
        });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [{ model: Task, as: "tasks" }],
        });

        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los datos",
            error: error.message,
        });
    }
};