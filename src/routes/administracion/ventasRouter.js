import { Router } from "express";
import { createDDController,getNCODbyIdDocController,getFVEbyIdDocController,getFVbyIdDocController,getAllFVController, createFVController, createFVEController,createNCoDConItemsController, 
} from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.get('/ventas/FV', getAllFVController)
router.get('/ventas/FV/:fvDVID', getFVbyIdDocController)

router.post('/ventas/FVE', createFVEController)
router.get('/ventas/FVE/:fveDVID', getFVEbyIdDocController)

router.post('/ventas/NCOD', createNCoDConItemsController)
router.get('/ventas/NCOD/:DVID', getNCODbyIdDocController)

router.post('/ventas/DD', createDDController)


export default router


