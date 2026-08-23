import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const personalData = sequelize.define("dataPr", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
  },

  birthDate: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
