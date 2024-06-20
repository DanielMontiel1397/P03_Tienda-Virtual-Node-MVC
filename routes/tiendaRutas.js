import express from 'express';
import { inicio, misProductos, formularioAgregarProducto, crearProducto } from '../controllers/tiendaControlador.js';
import upload from '../middelware/subirImagn.js';

const rutas = express.Router();

rutas.get('/inicio',inicio);

rutas.get('/mis-productos',misProductos);

//Agregar Producto
rutas.get('/crear',formularioAgregarProducto);
rutas.post('/crear',
    upload.single('imagen'),
    crearProducto);
export default rutas;