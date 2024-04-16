import { Router } from "express";
import { createDDController, createFVController, createFVEController,createNCoDConItemsController, 
} from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.post('/ventas/FVE', createFVEController)
router.post('/ventas/NCOD', createNCoDConItemsController)
router.post('/ventas/DD', createDDController)


export default router


