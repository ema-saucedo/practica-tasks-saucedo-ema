import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('tasks_users_db', 'root', '', {
  host: "localhost",
  dialect: "mysql",
});

export const startDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync();
        console.log('Conexion a la db esta lista');
    } catch (error) {
        console.error('No se pudo conectar a la db:', error);
    }
};