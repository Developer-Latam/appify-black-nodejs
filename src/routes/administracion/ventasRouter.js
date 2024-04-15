import { Router } from "express";
import { createFVController, createFVEController,createNCoDConItemsController, 
} from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.post('/ventas/FVE', createFVEController)
router.post('/ventas/NCOD', createNCoDConItemsController)


export default router


