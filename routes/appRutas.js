import express from 'express'
import { mostrarProductos } from '../controllers/appControlador.js';
const rutas = express.Router();

rutas.get('/productos',mostrarProductos);

export default rutas;