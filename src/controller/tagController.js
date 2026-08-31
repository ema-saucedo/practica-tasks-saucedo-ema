import { matchedData } from "express-validator";
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

export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id, {
            include: [
                { model: Task, as: "tasks" }
            ]
        });

        if (!tag) {
            return res.status(404).json({
                message: "Etiqueta no encontrada"
            });
        }

        return res.status(200).json(tag);

    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener la etiqueta",
            error: error.message
        });
    }
};

export const updateTag = async (req , res) => {
    try {
        const { id } = req.params;

        const tag = await Tag.findByPk(id)

        if (!tag) {
            return res.status(400).json({
                message:"La etiqueta no existe"
            });
        }
        const data = matchedData(req, { locations: ["body"]});

        await tag.update(data);

        return res.status (200).json({
            message:"La etiqueta se actualizó correctamente",
            tag
        });
    } catch (error) {
        return res.status(500).json({
            message:"Error al actualizar la tarjeta",
            error: error.message
        })
    }
}

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tagDelete = await Tag.findByPk(id);

        if (!tagDelete) {
            return res.status(400).json({
                message:"Etiqueta no encontrada",
            });
        }

        await tagDelete.destroy();
        
        res.status(200).json({
            message:"La etiqueta se eleminó correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message:"Error al eleiminar la etiqueta",
            error: error.message
        })
    }
}
