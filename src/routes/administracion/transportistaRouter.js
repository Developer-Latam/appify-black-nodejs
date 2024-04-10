import { Router } from 'express';
import { 
    createTransportista,
    getTransportistaById,
    getTransportistaByUserId,
    updateTransportista,
    deleteTransportista
} from '../../controllers/administracion/transportistaController.js';
const router = Router();

// Ruta para crear un Transportista
router.post('/cliente', createTransportista);

// Ruta para obtener un Transportista con su ID
router.get('/cliente/:idCliente', getTransportistaById);

// Ruta para obtener todos los Transportistas por ID de usuario
router.get('/clientes/:id', getTransportistaByUserId);

// Ruta para actualizar un Transportista
router.put('/cliente/:idCliente', updateTransportista);

// Ruta para eliminar un Transportista con su ID
router.delete('/cliente/:idCliente', deleteTransportista);

export default router

