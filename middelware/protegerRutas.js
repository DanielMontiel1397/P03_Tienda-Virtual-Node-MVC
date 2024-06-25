import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

const protegerRuta = async (req,res,next) => {
    const {_token} = req.cookies;

    if(!_token){
        return res.redirect('/usuario/login');
    }

    try{
        const decodificarToken = jwt.verify(_token,process.env.JWT_SECRET);
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decodificarToken.id);

        if(usuario){
            req.usuario = usuario;
            return next();
        } else {
            return res.redirect('/usuario/login');
        }
    } catch(error) {
        return res.clearCookie('_token').redirect('/usuario/login');
    }
}

export default protegerRuta;