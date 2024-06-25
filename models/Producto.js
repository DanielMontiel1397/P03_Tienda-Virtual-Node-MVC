import { DataTypes } from "sequelize";
import db from '../config/baseDatos.js';

const Producto = db.define('productos',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombreProducto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcionProducto: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    colorProducto: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tallaProducto: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    imagenProducto: {
        type: DataTypes.STRING,
        allowNull:false
    },
    cantidadProducto: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Producto;