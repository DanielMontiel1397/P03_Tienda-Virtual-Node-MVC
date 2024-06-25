import express from 'express';
import { formularioLogin, iniciarSesion, formularoRegistro, enviarRegistro, editarUsuario, cerrarSesion } from '../controllers/usuarioControlador.js';

const rutas = express.Router();

//Routing

//Vista Login
rutas.get('/login',formularioLogin);
rutas.post('/login',iniciarSesion);

rutas.post('/cerrarSesion',cerrarSesion)
//Vista Register
rutas.get('/registro',formularoRegistro);
rutas.post('/registro',enviarRegistro);

//Editar Usuario
rutas.get('/editar',editarUsuario);

export default rutas;