import { Router } from 'express';
import { createService, deleteService, getServiceById, getServiceByUserId, updateService } from '../../controllers/miempresa/serviceControler.js';

const router = Router();

// Ruta para crear un servicio
router.post('/service', createService);

// Ruta para obtener un servicio con su ID
router.get('/service/:idServicio', getServiceById);

// Ruta para obtener todos los servicios por ID de usuario
router.get('/services/:id', getServiceByUserId);

// Ruta para actualizar un servicio
router.put('/service/:idServicio', updateService);

// Ruta para eliminar un servicio con su ID
router.delete('/service/:idServicio', deleteService);

export default router

