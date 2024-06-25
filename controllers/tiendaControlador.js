import {Categoria, Producto, Usuario} from '../models/index.js';
import { check, validationResult } from 'express-validator';
import fs from 'fs'

const inicio = (req,res) => {
    res.render('./tienda/inicio',{
        csrfToken: req.csrfToken()
    })
}

const misProductos = async (req,res) => {

    const {id} = req.usuario;
    const productos = await Producto.findAll({
        where: {
            usuarioId: id
        },
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Usuario, as: 'usuario'}
        ]
    });

    res.render('./tienda/mis-productos',{
        pagina:"Mis Productos",
        productos,
        csrfToken: req.csrfToken()
    });
}

const formularioAgregarProducto = async (req,res) => {

    const categorias = await Categoria.findAll();

    res.render('./tienda/formularioAgregarProducto',{
        pagina:"Agregar Producto",
        categorias,
        csrfToken: req.csrfToken(),
        producto: {}
    })
}

const crearProducto = async (req,res,next) => {
    
    const categorias = await Categoria.findAll();

    //Validar con express-validator los campos
    await check('nombreProducto').notEmpty().withMessage('El campo Producto es Obligatorio').run(req);
    await check('colorProducto').notEmpty().withMessage('El Campo Color es Obligatorio').run(req);
    await check('tallaProducto').notEmpty().withMessage('El Campo Talla es Obligatorio').run(req);
    await check('categoriaProducto').notEmpty().withMessage('El Campo Categoria es Obligatorio').run(req);
    await check('cantidadProducto').isInt({gt: 0}).withMessage('El Campo Cantidad tiene que ser mayor a Cero').run(req);
    await check('descripcionProducto').notEmpty().withMessage('El Campo Descripcion es Obligatorio').run(req);

    //Si hay errores mandar mensajes a la vista y rellenar campos validados
    let erroresResultado = validationResult(req);
    console.log(req.body);
  
    if(!erroresResultado.isEmpty()){

        //Eliminar imagen
        if(req.file){
            fs.unlinkSync(`./public/uploads/${req.file.filename}`)
        }
        return res.render('./tienda/formularioAgregarProducto',{
        pagina:"Agregar Producto",
        csrfToken: req.csrfToken(),
        categorias,
        producto: req.body,
        errores: erroresResultado.array()
    })
    }

    // Comprobar si la imagen si se subio correctamete

    if(req.file){
        fs.readFile(`./public/uploads/${req.file.filename}`,(error, image) => {
            if(error){
                console.log(error.message);
                return res.render('./tienda/formularioAgregarProducto',{
                    pagina:"Agregar Producto",
                    csrfToken: req.csrfToken(),
                    categorias,
                    errores: [{msg: "La imagen no se subio Correctamente"}]
                })
            }
        })
    } else {
        return res.render('./tienda/formularioAgregarProducto',{
            pagina:"Agregar Producto",
            csrfToken: req.csrfToken(),
            categorias,
            errores: [{msg: "No se agrego una Imagen"}]
        })
    }

    //Extraer datos del body
    const {nombreProducto,colorProducto,tallaProducto,categoriaProducto,cantidadProducto,descripcionProducto} = req.body;
    const {id: usuarioId} = req.usuario;
    
    //Agregar Producto a la DB
    try{
        const productoGuardado = await Producto.create({
            nombreProducto,
            colorProducto,
            tallaProducto,
            descripcionProducto,
            cantidadProducto,
            usuarioId,
            categoriaId: categoriaProducto,
            imagenProducto: req.file.filename
        })

        res.redirect('/tienda/inicio');
    } catch (error){
        fs.unlinkSync(`./public/uploads/${req.file.filename}`)
        console.log(error);
    }

}

const editarProducto = async (req,res) => {
    const {id} = req.params;

    const producto = await Producto.findByPk(id);

    if(!producto){
        return res.redirect('/tienda/mis-productos');
    }

    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/tienda/mis-productos');
    }

    const categorias = await Categoria.findAll();

    res.render('tienda/editar-producto',{
        pagina: `Editar ${producto.nombreProducto}`,
        csrfToken: req.csrfToken(),
        categorias,
        producto
    })
}

const guardarCambios = async (req,res) => {
    const categorias = await Categoria.findAll();
    const {id} = req.params;
    const producto = await Producto.findByPk(id);

    //Validar con express-validator los campos
    await check('nombreProducto').notEmpty().withMessage('El campo Producto es Obligatorio').run(req);
    await check('colorProducto').notEmpty().withMessage('El Campo Color es Obligatorio').run(req);
    await check('tallaProducto').notEmpty().withMessage('El Campo Talla es Obligatorio').run(req);
    await check('categoriaProducto').notEmpty().withMessage('El Campo Categoria es Obligatorio').run(req);
    await check('cantidadProducto').isInt({gt: 0}).withMessage('El Campo Cantidad tiene que ser mayor a Cero').run(req);
    await check('descripcionProducto').notEmpty().withMessage('El Campo Descripcion es Obligatorio').run(req);

    //Si hay errores mandar mensajes a la vista y rellenar campos validados
    let erroresResultado = validationResult(req);
  
    if(!erroresResultado.isEmpty()){

        return res.render('./tienda/editar-producto',{
        pagina:`Editar ${producto.nombreProducto}`,
        csrfToken: req.csrfToken(),
        categorias,
        producto: req.body,
        errores: erroresResultado.array()
    })
    }

    //Validar que la propiedad exista
    if(!producto){
        return res.redirect('/tienda/mis-productos');
    }

    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/tienda/mis-productos');
    }

    
    //Extraer datos del body
    //Reescribir el objeto
    try{
        const {nombreProducto,colorProducto,tallaProducto,categoriaProducto,cantidadProducto,descripcionProducto} = req.body;
        producto.set({
            nombreProducto,
            colorProducto,
            tallaProducto,
            descripcionProducto,
            cantidadProducto,
            categoriaId: categoriaProducto
        })

        await producto.save();
        res.redirect('/tienda/mis-productos');
    } catch (error){
        console.log(error);
    }
}

const eliminarProducto = async (req,res) => {
    const {id} = req.params;

    const producto = await Producto.findByPk(id);

    if(!producto){
        return res.redirect('/tienda/mis-productos');
    }

    if(producto.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/tienda/mis-productos');
    }

    fs.unlinkSync(`./public/uploads/${producto.imagenProducto}`)
    await producto.destroy();
    res.redirect('/tienda/mis-productos');
}

//Ver Vendedores
const verVendedores = async (req,res) => {

    const vendedores = await Usuario.scope("eliminarPassword").findAll()

    res.render('./tienda/usuarios/mostrarVendedores',{
        pagina: "Vendedores",
        vendedores,
        csrfToken: req.csrfToken()
    })
}

export {
    inicio,
    misProductos,
    formularioAgregarProducto,
    crearProducto,
    editarProducto,
    guardarCambios,
    eliminarProducto,
    verVendedores
};