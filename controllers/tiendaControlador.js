import {Categoria} from '../models/index.js';
import { check, validationResult } from 'express-validator';

const inicio = (req,res) => {
    res.render('./tienda/inicio')
}

const misProductos = async (req,res) => {
    res.render('./tienda/mis-productos',{
        pagina:"Mis Productos"
    });
}

const formularioAgregarProducto = async (req,res) => {

    const categorias = await Categoria.findAll();

    res.render('./tienda/formularioAgregarProducto',{
        pagina:"Agregar Producto",
        categorias,
        csrfToken: req.csrfToken()
    })
}

const crearProducto = async (req,res,next) => {

    //Validar con express-validator los campos
    await check('nombreProducto').notEmpty().withMessage('El campo Producto es Obligatorio').run(req);
    //Si hay errores mandar mensajes a la vista y rellenar campos validados

    //Verificar si el nombre del producto ya existe en la DB

    //Agregar Producto a la DB
    console.log(req.body);
    next()
}

export {
    inicio,
    misProductos,
    formularioAgregarProducto,
    crearProducto
}