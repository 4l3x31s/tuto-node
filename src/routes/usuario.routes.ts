import {Router} from 'express'
import {crearUsuarios, obtenerUsuarios, login} from '../controllers/usuario.controller';
const router = Router();

router.route('/operaciones')
.get(obtenerUsuarios)
.post(crearUsuarios);

router.route('/login')
.post(login)
export default router;