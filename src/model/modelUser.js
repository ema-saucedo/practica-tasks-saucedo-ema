import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export const modelUser = sequelize.define('User',{
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}

)