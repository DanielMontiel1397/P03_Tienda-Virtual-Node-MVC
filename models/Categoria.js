import { DataTypes } from "sequelize";
import db from '../config/baseDatos.js';

const Categoria = db.define('categorias',{
    categoriaProducto: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
})
export default Categoria;