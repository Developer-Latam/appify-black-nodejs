import { Router } from "express";
import { updateProyectoController, updateParaClientesController } from "../../../controllers/miempresa/configs/comercialController.js";
const router = Router()


router.put('/upd/proyecto/:id', updateProyectoController)

router.put('/upd/para-clientes/:id', updateParaClientesController)


export default router