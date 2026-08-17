import { User, PersonalData } from "../model/index.js";

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

        const alreadyExists = await PersonalData.findOne({ where: { user_id: userId } });
        if (alreadyExists) {
            return res.status(400).json({
                message: "Este usuario ya tiene datos personales cargados",
            });
        }

        const personalData = await PersonalData.create({
            dni,
            birthDate,
            address,
            user_id: userId,
        });

        res.status(201).json({
            message: "Datos personales creados",
            personalData,
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
        const personalDatas = await PersonalData.findAll({
            include: [{ model: User, as: "user" }],
        });

        res.status(200).json(personalDatas);
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener todos los datos",
            error: error.message,
        });
    }
};