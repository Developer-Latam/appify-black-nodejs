import { Router } from "express";
import { updateProyectoController, updateParaClientesController } from "../../../controllers/miempresa/configs/comercialController.js";
const router = Router()


router.put('/upd/proyecto/:id', updateProyectoController)

router.put('/upd/para-clientes/:id', updateParaClientesController)

router.get('/allcomercial/:userId', getProyectoYParaClientesController)


export default router