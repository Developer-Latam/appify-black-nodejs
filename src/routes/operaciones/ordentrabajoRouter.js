import { Router } from 'express';
import { 
    createOrdenTrabajo,
    getOrdenTrabajoById,
    getOrdenTrabajoByUserId,
    updateOrdenTrabajo
} from '../../controllers/operaciones/ordentrabajoController.js';
const router = Router();

// Ruta para crear una orden de trabajo
router.post('/ordenTrabajo', createOrdenTrabajo);

// Ruta para obtener una orden de trabajo con su ID
router.get('/ordenTrabajo/:id', createOrdenTrabajo);

// Ruta para obtener todas las ordenes de trabajo por ID de usuario
router.get('/ordenTrabajos/:idUser', getOrdenTrabajoByUserId);

// Ruta para actualizar una orden de trabajo
router.put('/ordenTrabajo/:id', updateOrdenTrabajo);


export default router