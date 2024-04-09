import { Router } from "express";
import { createFVController, createFVEController } from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.post('/ventas/FVE', createFVEController)


export default router