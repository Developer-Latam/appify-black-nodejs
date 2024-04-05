import { Router } from "express";
import { createFVController } from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)


export default router