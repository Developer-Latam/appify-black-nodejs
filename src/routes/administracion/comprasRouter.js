import { Router } from "express";
import { 
    createFCController,
    createFCEController,
    createNCoDConItemsController,
    getAllDocumentosComprasController,
    getDocumentosCompraByUserController
} from "../../controllers/administracion/comprasController.js";
const router = Router()


router.post('/compras/FC', createFCController)
router.post('/compras/FCE', createFCEController)
//listoooo 


router.post('/compras/NCOD', createNCoDConItemsController)

router.get('/compras/DC', getAllDocumentosComprasController);
router.get('/compras/DC/:user', getDocumentosCompraByUserController);

export default router