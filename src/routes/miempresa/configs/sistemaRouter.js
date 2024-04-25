import { Router } from "express";
import { updateSistemaController, updateEmpresaController } from "../../../controllers/miempresa/configs/sistemaController.js";
const router = new Router()


router.put('/upd/sistema/:id', updateSistemaController)
router.get('/sistema/:id')
router.put('/upd/empresa/:id', updateEmpresaController)

export default router