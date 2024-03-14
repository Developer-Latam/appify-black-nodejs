import { Router } from "express";
import { createProveedorController, updateProveedorController } from "../controllers/proveedorController.js";

const router = Router()

router.post('/createProv', createProveedorController)
router.put('/updProv/:id', updateProveedorController)


export default router