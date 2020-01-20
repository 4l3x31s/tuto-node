import {Router} from 'express'
import {crearUsuarios, obtenerUsuarios, login, actualizarUsuario, eliminarUsuario} from '../controllers/usuario.controller';
const router = Router();

router.route('/operaciones')
.get(obtenerUsuarios)
.post(crearUsuarios)
.put(actualizarUsuario);
//.delete('/:id',eliminarUsuario);

router.route('/operaciones/:id')
.delete(eliminarUsuario);


router.route('/login')
.post(login)
export default router;