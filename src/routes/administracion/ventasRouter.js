import { Router } from "express";
import { createDDController,getItemsNCODbyIdNCODController,getNCODbyIdDocController,getFVEbyIdDocController,getFVbyIdDocController,getAllFVController, createFVController, createFVEController,createNCoDConItemsController, 
} from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.get('/ventas/FV', getAllFVController)
router.get('/ventas/FV/:fvDVID', getFVbyIdDocController)

router.post('/ventas/FVE', createFVEController)
router.get('/ventas/FVE/:fveDVID', getFVEbyIdDocController)

router.post('/ventas/NCOD', createNCoDConItemsController)
router.get('/ventas/NCOD/:DVID', getNCODbyIdDocController)
//NUEVOS
//nota factura venta y factura venta por NCOD ID
router.get('/ventas/NCOD-FV/:NCOD', getItemsNCODbyIdNCODController)
//nota factura venta excenta y factura venta excenta por NCOD ID
router.get('/ventas/NCOD-FVE/:NCOD', getItemsNCODbyIdNCODController)

router.get('/ventas/NCOD-NC/:NCOD', getItemsNCODbyIdNCODController)


router.post('/ventas/DD', createDDController)


export default router


// notas_de_credito_debito, -------  idDoc-documento_venta
// nota_factura_venta, ------- idNotadeCD-notas_de_credito_debito
// nota_factura_venta_excenta, ------- idNotadeCD-notas_de_credito_debito 


// nota_credito_nota_NC ------- idNotadeCD-notas_de_credito_debito



// notas_de_credito_debito,
// item_servicio_nota_credito,
// item_producto_nota_credito,
// item_servicio_nota_credito_NC,
// item_producto_nota_credito_NC,
// item_servicio_factura_venta,
// item_producto_factura_venta,
// item_servicio_factura_venta_excenta,
// item_producto_factura_venta_excenta