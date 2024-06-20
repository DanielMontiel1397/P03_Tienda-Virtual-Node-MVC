import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

//Configurar dotenv para cargar variables desde .env
dotenv.config({path: '.env'});

//Creamos una nueva instancia de Sequelize
const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USUARIO,
    process.env.BD_PASSWORD,
    {
       host: process.env.BD_HOST,
       port: process.env.BD_PORT,
       dialect: 'mysql',
       define: {
        timestamps: true
       } ,
       pool: {
        max: 4,
        min: 0,
        acquire: 30000,
        idle: 10000
       },
       operatorsAliases: false
    }
);

export default db;