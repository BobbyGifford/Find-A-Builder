import {Sequelize} from 'sequelize';

// @ts-ignore
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});
try {
    sequelize.sync(); // Sync models with the database

} catch (e) {
    console.error(e)
}
