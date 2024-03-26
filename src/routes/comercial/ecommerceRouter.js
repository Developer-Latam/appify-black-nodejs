import { Router } from 'express';
import { 
    createEcommerce,
    getEcommerceById,
    getEcommerceByUserId,
    getEcommerceByCategoryId,
    updateEcommerce,
    deleteEcommerce
} from '../../controllers/comercial/ecommerceController.js';
const router = Router();

// Ruta para crear un cliente
router.post('/ecomerce', createEcommerce);

// Ruta para obtener un cliente con su ID
router.get('/ecomerce/:idEcommerce', getEcommerceById);

// Ruta para obtener todos los cliente por ID de usuario
router.get('/ecomerce/:id', getEcommerceByUserId);

// Ruta para obtener todos los cliente por ID de usuario y categoria en el body.
router.get('/ecomerce/:idEcommerce', getEcommerceByUserId);

// Ruta para actualizar un cliente
router.put('/ecomerce/:idEcommerce', updateEcommerce);

// Ruta para eliminar un cliente con su ID
router.delete('/ecomerce/:idEcommerce', deleteEcommerce);

export default router

