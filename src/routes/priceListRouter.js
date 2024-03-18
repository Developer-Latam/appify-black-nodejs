import { Router } from 'express';
import {
  getAllPriceLists,
  getPriceList,
  createPriceList,
  updatePriceList,
  deletePriceList
} from '../controllers/PriceListController.js';
import { createPriceListWithProducts } from '../controllers/PriceListController.js';

const router = Router();

// Obtener todas las listas de precios de un usuario
router.get('/:userId/lists', getAllPriceLists);

// Obtener una lista de precios específica por su ID y el ID del usuario
router.get('/:userId/list/:id', getPriceList);

// Crear una nueva lista de precios
router.post('/create', createPriceList);

// Actualizar una lista de precios existente por su ID
router.put('/update/:id', updatePriceList);

// Eliminar una lista de precios por su ID
router.delete('/delete/:id', deletePriceList);

// Nueva ruta para crear listas de precios con productos
router.post('/create-with-products', createPriceListWithProducts);
export default router;
