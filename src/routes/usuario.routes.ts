import {Router} from 'express'
import {crearUsuarios, obtenerUsuarios, login, actualizarUsuario, eliminarUsuario} from '../controllers/usuario.controller';
import { TokenValidation } from '../libs/verifyToken'
const router = Router();

router.route('/operaciones')
.get(TokenValidation, obtenerUsuarios)
.post(crearUsuarios)
.put(TokenValidation, actualizarUsuario);
//.delete('/:id',eliminarUsuario);

router.route('/operaciones/:id')
.delete(TokenValidation, eliminarUsuario);


router.route('/login')
.post(login)
export default router;