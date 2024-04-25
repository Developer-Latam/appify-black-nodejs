import { Router } from "express";
import { createDDController,getDocumentosDespachoByUserController,getAllDataVentasByUserId,getAllDocumentosDespachoController,getDocumentosVentaByUserController,getAllDocumentosVentaController,getItemsNCODbyIdNCODController,getNCODbyIdDocController,getFVEbyIdDocController,getFVbyIdDocController,getAllFVController, createFVController, createFVEController,createNCoDConItemsController, 
} from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.get('/ventas/FV', getAllFVController)
router.get('/ventas/FV/:fvDVID', getFVbyIdDocController)

router.post('/ventas/FVE', createFVEController)
router.get('/ventas/FVE/:fveDVID', getFVEbyIdDocController)

router.post('/ventas/NCOD', createNCoDConItemsController)
router.get('/ventas/NCOD/:DVID', getNCODbyIdDocController)

//Hay pasar el tipo de nota (FV-FVE-NC) y el id de la nota de credito referido a ese doc
router.get('/ventas/NCOD/:tipoNota/:NCOD', getItemsNCODbyIdNCODController)

router.get('/ventas/DV', getAllDocumentosVentaController);
router.get('/ventas/DV/:user', getDocumentosVentaByUserController);

// Obtener todos los datos
router.get('/ventas/alldata/:user', getAllDataVentasByUserId);


router.post('/ventas/DD', createDDController)

router.get('/ventas/DD', getAllDocumentosDespachoController);
router.get('/ventas/DD/:user', getDocumentosDespachoByUserController);

export default router

