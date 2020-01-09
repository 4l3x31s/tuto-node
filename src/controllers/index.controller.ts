import { Response, Request } from "express";

export function indexWelcome(req: Request, res:Response) {
    return res.json('bienvenido res');
}