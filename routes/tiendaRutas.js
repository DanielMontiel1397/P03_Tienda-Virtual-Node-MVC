import express from 'express';
import { inicio, misProductos, formularioAgregarProducto, crearProducto, editarProducto, guardarCambios, eliminarProducto, verVendedores } from '../controllers/tiendaControlador.js';
import upload from '../middelware/subirImagn.js';
import protegerRuta from '../middelware/protegerRutas.js';

const rutas = express.Router();

rutas.get('/inicio',protegerRuta,inicio);

rutas.get('/mis-productos',protegerRuta,misProductos);

//Agregar Producto
rutas.get('/crear',protegerRuta,formularioAgregarProducto);
rutas.post('/crear',protegerRuta,
    upload.single('imagen'),
    crearProducto);

//Editar Producto
rutas.get('/mis-productos/editar/:id',protegerRuta,editarProducto);
rutas.post('/mis-productos/editar/:id',protegerRuta,guardarCambios)
//Eliminar Productos
rutas.post('/mis-productos/eliminar-producto/:id',protegerRuta,eliminarProducto);

//Vista Vendedores
rutas.get('/vendedores',verVendedores);
    
export default rutas;