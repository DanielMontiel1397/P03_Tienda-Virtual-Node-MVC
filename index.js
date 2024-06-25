import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import rutasUsuario from './routes/usuarioRutas.js';
import rutasTienda from './routes/tiendaRutas.js';
import rutasApp from './routes/appRutas.js';
import db from './config/baseDatos.js';

//Creamos la aplicacion con Express
const app = express();

//Habilitar lectura de formularios
app.use(express.urlencoded({extended: true}));

//Habilitar cookie parser
app.use(cookieParser());

app.use(csrf({cookie:true}))

//Conexion a base de datos
try {
    await db.authenticate();
    db.sync();
    console.log("Conexión correcta a la Base de datos");
} catch (error) {
    console.log('HUBO UN ERROR: ' + error);
}

//Habilitar PUG
app.set('view engine','pug');
app.set('views','./views');

//Definir carpeta publica
app.use(express.static('public'));

//Routing
app.use('/usuario',rutasUsuario);

//Routing Inicio Sesión
app.use('/tienda',rutasTienda);

//Routing app
app.use('/',rutasApp);

//Definir puerto para arrancar el proyecto
const port = 3000;

app.listen(port, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})