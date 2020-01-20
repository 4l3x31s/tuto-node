import Usuario, { IUsuario } from './../models/usuario.model';
import { Response, Request } from "express";
import jwt from 'jsonwebtoken';

export function obtenerUsuarios(req: Request, res:Response) {
    Usuario.find().exec()
        .then(datos => {
            console.log(datos);
            return res.json(datos);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        });
}

export async function actualizarUsuario(req:Request, res: Response){
    let user: IUsuario = Object.assign(req.body);
    let usuario: IUsuario = new Usuario({
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        pass: user.pass,
        _id: user._id
    });
    usuario.pass = await usuario.encryptPassword(usuario.pass); //cifra
    console.log("data ac")
    console.log(usuario);
    Usuario.findByIdAndUpdate(usuario._id, usuario).exec()
        .then(data => {
            console.log(data);
            return res.json("Dato Actualizado");
        })
        .catch(err => {
            console.log(err)
            return res.json(err);
        });
}
export function eliminarUsuario(req: Request, res: Response) {
    console.log("params")
    console.log(req.params);
    Usuario.findByIdAndDelete(req.params.id).exec()
        .then(data => {
            console.log(data);
            return res.json(data);
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        })
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

    return res.header('token', token).json(saveUser);
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
    
    return res.header('token', token).json(usuarioEncontrado);
}