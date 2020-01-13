import Usuario, { IUsuario } from './../models/usuario.model';
import { Response, Request } from "express";
import jwt from 'jsonwebtoken';

export function obtenerUsuarios(req: Request, res:Response) {
    let usuario ={
        nombre: "Juan",
        apellido: "Perez",
        edad: 22,
        pass: "asdasd"
    };
    Usuario.find().exec()
        .then(datos => {
            console.log(datos)
        })
    
    return res.json(usuario);
}

export async function crearUsuarios(req: Request, res:Response) {
    let user: IUsuario = Object.assign(req.body);
    let usuario: IUsuario = new Usuario({
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        pass: user.pass
    });
    usuario.pass = await usuario.encryptPassword(usuario.pass); //cifra
    const saveUser = await usuario.save();
    //creando token
    let token: string = jwt.sign({id: saveUser._id}, process.env.TOKEN_SECRET || 'PRUEBA');

    return res.header('auth-token', token).json(saveUser);
}

export async function login(req: Request, res: Response) {
    let user: IUsuario = Object.assign(req.body);
    const usuarioEncontrado = await Usuario.findOne({nombre: user.nombre});
    if(!usuarioEncontrado) return res.status(400).json('error al encontrar el usuario');

    const correctPass: boolean = await usuarioEncontrado.validatePassword(user.pass);
    if(!correctPass) return res.status(400).json('contraseña incorrecta');
    
    let token: string = jwt.sign({id: usuarioEncontrado._id}, process.env.TOKEN_SECRET || 'PRUEBA', {
        expiresIn: 60 * 60 * 24
    }); //token vence en 24 horas
    
    return res.header('auth-token', token).json(usuarioEncontrado);
}