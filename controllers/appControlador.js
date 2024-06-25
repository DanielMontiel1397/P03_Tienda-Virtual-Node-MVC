import { Producto, Categoria, Usuario } from "../models/index.js"


const mostrarProductos = async (req,res) => {
    const productos = await Producto.findAll({
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Usuario, as: 'usuario'}
        ]
    })

    res.render('productosPublicados',{
        pagina: "Productos",
        productos
    })
}

export {
    mostrarProductos
}