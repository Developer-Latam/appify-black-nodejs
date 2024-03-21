import { Router } from 'express';

const router = Router();

router.post('/product', createProduct);
router.get('/product/:idProducto', getProductById);
router.get('/products/:id', getProductsByUserId);
router.put('/product/:idProducto', updateProduct);
router.delete('/product/:idProducto', deleteProduct);

export default router

