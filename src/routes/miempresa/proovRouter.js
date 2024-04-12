import { Router } from "express";
import { createProveedorController, updateProveedorController,getProveedoresByUserId } from "../../controllers/miempresa/proveedorController.js";


const router = Router()

router.post('/createProv', createProveedorController)
router.put('/updProv/:id', updateProveedorController)
router.get('/todos/:id', getProveedoresByUserId)


export default router