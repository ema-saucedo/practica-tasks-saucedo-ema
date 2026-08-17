import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


export const taskTag = sequelize.define("TaskTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
