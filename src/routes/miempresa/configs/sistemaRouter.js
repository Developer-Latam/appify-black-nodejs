import { Router } from "express";
import { createSistemaController, updateSistemaController, createEmpresaController, updateEmpresaController } from "../../../controllers/miempresa/configs/sistemaController.js";
const router = new Router()


router.post('/create-sistema', createSistemaController)
router.put('/upd/sistema/:id', updateSistemaController)
router.post('/empresa', createEmpresaController) 
router.put('/upd/empresa/:id', updateEmpresaController)

export default router