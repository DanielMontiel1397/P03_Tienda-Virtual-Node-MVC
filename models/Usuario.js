import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/baseDatos.js";

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    hooks: {
        beforeCreate: async function (usuario){
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password,salt);
        }
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password','createdAt','updatedAt']
            }
        }
    }
}
);

//Metodo personalizado para verificar el password
Usuario.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

export default Usuario;