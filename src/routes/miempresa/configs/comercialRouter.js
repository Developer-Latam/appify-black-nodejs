import { Router } from "express";
import { createProyectoController, updateProyectoController, createParaClientesController, updateParaClientesController } from "../../../controllers/miempresa/configs/comercialController.js";
const router = Router()

router.post('/proyecto', createProyectoController)
router.put('/upd/proyecto/:id', updateProyectoController)
router.post('/para-clientes', createParaClientesController)
router.put('/upd/para-clientes/:id', updateParaClientesController)


export default router