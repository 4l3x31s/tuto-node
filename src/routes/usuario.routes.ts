import {Router} from 'express'
import {crearUsuarios, obtenerUsuarios} from '../controllers/usuario.controller';
const router = Router();

router.route('/operaciones')
.get(obtenerUsuarios)
.post(crearUsuarios);
export default router;