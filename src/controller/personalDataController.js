import { matchedData } from "express-validator";
import { User, personalData } from "../model/index.js";

export const createPersonalData = async (req, res) => {
    try {
        const { dni, birthDate, address, userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "Debe indicar el usuario dueño de los datos personales",
            });
        }

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.status(404).json({
                message: "El usuario indicado no existe",
            });
        }

        const alreadyExists = await personalData.findOne({ where: { user_id: userId } });
        if (alreadyExists) {
            return res.status(400).json({
                message: "Este usuario ya tiene datos personales cargados",
            });
        }

        const newPersonalData = await personalData.create({
            dni,
            birthDate,
            address,
            user_id: userId,
        });

        res.status(201).json({
            message: "Datos personales creados",
            personalData: newPersonalData,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear los datos personales",
            error: error.message,
        });
    }
};

export const getPersonalData = async (req, res) => {
    try {
        const personalDatas = await personalData.findAll({
            include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
        });

        res.status(200).json(personalDatas);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los datos",
            error: error.message,
        });
    }
};

export const getPersonalDataById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await personalData.findByPk(id);

        if (!data) {
            return res.status(404).json({
                message: "Datos no encontrados"
            });
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            message: "Error al buscar los datos",
            error: error.message
        });
    }
};

export const updatePersonalData = async (req, res) => {
  try {
    const { id } = req.params;

    const personalDataUpdate = await personalData.findByPk(id);

    if (!personalDataUpdate) {
      return res.status(404).json({
        message: "Datos no encontrados",
      });
    }
    const data = matchedData(req, {
    locations: ["body"]
    });

    await personalDataUpdate.update(data)

    return res.status(200).json({
      message:"Los datos se actualizaron correctamente.",
      personalDataUpdate
    })

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la datos",
      error: error.message,
    });
  }
};

export const deletePersonalData = async (req, res) => {
  try {
    const { id } = req.params;

    const personalDataDelete = await personalData.findByPk(id);

    if (!personalDataDelete) {
      return res.status(404).json({
        message: "Datos no encontrados",
      });
    }

    await personalDataDelete.destroy();

    res.status(200).json({
      message: "Datos eliminados correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar los datos",
      error: error.message,
    });
  }
};
