import { Router } from "express";
import { 
    createFCController,
    createFCEController,
    createNCoDConItemsController,
    getAllDocumentosComprasController,
    getDocumentosCompraByUserController,
    getFCbyIdDocController,
    getFCEbyIdDocController
} from "../../controllers/administracion/comprasController.js";
const router = Router()


router.post('/compras/FC', createFCController)
router.get('/compras/FC/:fcDCID', getFCbyIdDocController)


router.post('/compras/FCE', createFCEController)
router.get('/compras/FCE/:fceDCID', getFCEbyIdDocController)


router.post('/compras/NCOD', createNCoDConItemsController)
router.get('/compras/NCOD/:DCID')

router.get('/compras/NCOD/:tipoNota/:NCOD')

router.get('/compras/DC', getAllDocumentosComprasController);
router.get('/compras/DC/:user', getDocumentosCompraByUserController);


//listoooo 





export default router