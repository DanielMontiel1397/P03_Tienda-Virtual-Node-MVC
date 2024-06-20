import categorias from "./categorias.js";
import {Categoria} from "../models/index.js";
import db from "../config/baseDatos.js";

const importarDatos = async ()=> {
    try{

        await db.authenticate();

        await db.sync();

        await Promise.all([
            Categoria.bulkCreate(categorias)
        ])
        console.log('Datos importados Correctamente');
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

const eliminarDatos = async () => {
    try{
        await db.sync({force: true});
        console.log('Datos eliminados Correctamente');
        process.exit(0)

    }catch(error){
        console.log(error);
        process.exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}

if(process.argv[2] === "-e"){
    eliminarDatos();
}
