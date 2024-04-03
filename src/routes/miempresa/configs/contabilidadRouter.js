import { Router } from "express";
import { createCobranzasController, createFEController, createModuloAdmController, updateCobranzasController, updateFEController, updateModuloAdmController } from "../../../controllers/miempresa/configs/contabilidadController.js";
const router = Router()

router.post('/fe', createFEController)
router.put('/fe/:id', updateFEController)
router.post('/cobranza', createCobranzasController)
router.put('/cobranza/:id', updateCobranzasController)
router.post('/modulo-adm', createModuloAdmController)
router.put('/modulo-adm/:id', updateModuloAdmController)

export default router