import { Router } from "express";
import { 
    createFCController,
    createFCEController,
    createNCoDConItemsController,
    getAllDocumentosComprasController,
    getDocumentosCompraByUserController
} from "../../controllers/administracion/comprasController.js";
const router = Router()

//listoooo 
router.post('/compras/FC', createFCController)

router.post('/compras/FCE', createFCEController)

router.post('/compras/NCOD', createNCoDConItemsController)

router.get('/compras/DC', getAllDocumentosComprasController);
router.get('/compras/DC/:user', getDocumentosCompraByUserController);

export default router