import { Router } from "express";
import { createSistemaController } from "../../../controllers/miempresa/configs/sistemaController.js";
const router = new Router()


router.post('/create', createSistemaController) 

export default router