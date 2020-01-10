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
    const saveUser = await usuario.save();
    //creando token
    let token: string = jwt.sign({id: saveUser._id}, process.env.TOKEN_SECRET || 'PRUEBA');

    return res.header('auth-token', token).json(saveUser);
}