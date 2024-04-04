import { Router } from "express";
import { createCobranzasController,updateAdmModulos, createFEController, createAdmModulos, updateCobranzasController, updateFEController } from "../../../controllers/miempresa/configs/contabilidadController.js";
const router = Router()

router.post('/fe', createFEController)
router.put('/fe/:id', updateFEController)
router.post('/cobranza', createCobranzasController)
router.put('/cobranza/:id', updateCobranzasController)
router.post('/modulo-adm', createAdmModulos)
router.put('/modulo-adm', updateAdmModulos)

export default router