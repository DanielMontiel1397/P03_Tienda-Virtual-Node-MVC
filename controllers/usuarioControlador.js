
import {Op} from 'sequelize';
import {check,validationResult} from 'express-validator';
import {generarJWT} from '../helpers/token.js';
import {Usuario} from "../models/index.js";

//Controlador para vista Login
const formularioLogin = (req,res)=>{
    res.render('./loginRegister/login.pug',{
        pagina: "Iniciar Sesión",
        csrfToken: req.csrfToken(),
    });
}

const iniciarSesion = async (req,res) => {

    //Validar los campos
    await check('email').isEmail().withMessage('No es un Email válido').run(req);
    await check('password').notEmpty().withMessage('El campo Password no puede ir vacio').run(req);
    
    let resultadoErrores = validationResult(req);

    if(!resultadoErrores.isEmpty()){
        return res.render('loginRegister/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            camposUsuario: {
                email: req.body.email
            },
            errores: resultadoErrores.array()
        })
    }

    //Extraer los datos
    const {email,password} = req.body;

    //Validamos si el correo existe en la base de datos
    const usuario = await Usuario.findOne({where: {email: email}});

    if(!usuario){
        return res.render('loginRegister/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            camposUsuario: {
                email: req.body.email
            },
            errores: [{msg: "El email no existe"}]
        })
    }

    //Comprobamos el Password

    if(!usuario.verificarPassword(password)){
        return res.render('loginRegister/login',{
            pagina: "Iniciar Sesión",
            csrfToken: req.csrfToken(),
            camposUsuario: {
                email: req.body.email
            },
            errores: [{msg: "El Password no es correcto"}]
        })
    }

    //Autenticamos al usuario con un token
    const token = generarJWT({id: usuario.id, nombre: usuario.nombre});

    //Almacenar en una cookie
    return res.cookie('_token',token,{
        httpOnly:true
    }).redirect('/tienda/inicio');
}

const cerrarSesion = (req,res) => {
    return res.clearCookie('_token').status(200).redirect('/usuario/login')
}

//Controlador para vista Registro
const formularoRegistro = (req,res) => {
    res.render('./loginRegister/registro.pug',{
        pagina: "Registro",
        csrfToken: req.csrfToken()
    });
}

//Registrar Usuario
const enviarRegistro = async (req,res) => {

    //Validar campos, usamos express-validator
    await check('nombre').notEmpty().withMessage('El campo Nombre no puede ir vacio').run(req);
    await check('usuario').notEmpty().withMessage('El campo Usuario no puede ir vacio').run(req);
    await check('email').isEmail().withMessage('No es un Email válido').run(req);
    await check('password').isLength({min: 6}).withMessage("La Contraseña debe tener al menos 6 carácteres").run(req);
    await check('password_2').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let resultadoErrores = validationResult(req);

    //Extraemos datos
    const {nombre, usuario, email, password} = req.body;

    if(!resultadoErrores.isEmpty()){
        return res.render('loginRegister/registro',{
            pagina: "Registro",
            csrfToken: req.csrfToken(),
            camposUsuario: {
                nombre,
                usuario,
                email
            },
            errores: resultadoErrores.array()
        })
    }

    //Si pasamos la validación comprobamos que el usuario e email no esten duplicados

    const existeUsuario = await Usuario.findOne({
        where:{
            [Op.or]:{
            usuario: usuario,
            email: email}
        }});

    if(existeUsuario){
        console.log('Ya esta registrado');
        return res.render('loginRegister/registro',{
            pagina: 'Registro',
            csrfToken: req.csrfToken(),
            errores: [{msg: "El Usuario o Email ya esta registrado"}],
            camposUsuario: {
                nombre,
                usuario,
                email
            }
        })
    }

    //Si el usuari no existe lo creamos
    const crearUsuario = await Usuario.create({
        nombre,
        usuario,
        email,
        password
    });

    res.render('templates/mensaje',{
        pagina: "Cuenta creada Correctamente",
        mensaje: "Ya puedes Iniciar Sesión"
    })
}

//Editar Usuario
const editarUsuario = async (req,res) => {
    res.render('tienda/usuarios/editarPerfil');
}

export {
    formularioLogin,
    iniciarSesion,
    cerrarSesion,
    formularoRegistro,
    enviarRegistro,
    editarUsuario
}