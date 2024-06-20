import Categoria from "./Categoria.js";
import Producto from "./Producto.js";
import Usuario from "./Usuario.js";

Producto.belongsTo(Categoria, {foreignKey: 'categoriaId', as: 'categoria'});
Producto.belongsTo(Usuario, {foreignKey: 'usuarioId', as: 'usuario'});

export {
    Producto,
    Usuario,
    Categoria
}