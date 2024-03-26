import { Router } from 'express';
import { 
    createCliente,
    getClienteById,
    getClienteByUserId,
    updateCliente,
    deleteCliente
} from '../../controllers/comercial/clientesController.js';
const router = Router();

// Ruta para crear un cliente
router.post('/cliente', createCliente);

// Ruta para obtener un cliente con su ID
router.get('/cliente/:idCliente', getClienteById);

// Ruta para obtener todos los cliente por ID de usuario
router.get('/clientes/:id', getClienteByUserId);

// Ruta para actualizar un cliente
router.put('/cliente/:idCliente', updateCliente);

// Ruta para eliminar un cliente con su ID
router.delete('/cliente/:idCliente', deleteCliente);

export default router

