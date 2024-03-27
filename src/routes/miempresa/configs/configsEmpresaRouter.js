import { Router } from "express";
import { createEmpresaController } from "../../../controllers/miempresa/configs/configEmpresaController.js";
const router = new Router()


router.post('/empresa', createEmpresaController) 

export default router