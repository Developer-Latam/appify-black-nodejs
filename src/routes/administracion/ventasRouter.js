import { Router } from "express";
import { createFVController, createFVEController, createNCoDController } from "../../controllers/administracion/ventasController.js";
const router = Router()

router.post('/ventas/FV', createFVController)
router.post('/ventas/FVE', createFVEController)
router.post('/ventas/NCOD', createNCoDController)


export default router



// example to create nota de credito 
// {
//     "notas_de_credito_debito": {
//       "idDoc": "DV-d8936f82-cc49-4194-aa68-dc722f17777a",
//       "idCliente": "cliente-26a583c8-5130-48a6-82eb-4796430bb354",
//       "idVendedor": "sub-user-b6034146-e508-4da5-bad9-eb7ec18fa5d7",
//       "tipo_credito": true,
//       "tipo_debito": false,
//       "numero_documento": "numero que proviene del sii",
//       "tipo_nota": "Anula documento de referencia",
//       "fecha": "2024-04-09",
//       "motivo_referencia": "motivo X",
//       "centro_de_beneficio": "Ventas",
//       "observacion": "Observaciones generales",
//       "nota_interna": "Nota interna relevante"
//     },
//     "nota_factura_venta": {
//       "id": 1,
//       "idFacturaVenta": "fv001",
//       "idNotadeCD": "ncd001"
//     },
//     "nota_factura_venta_excenta": {
//       "id": 2,
//       "idFacturaVenta": "fve001",
//       "idNotadeCD": "ncd001"
//     },
//     "nota_voucher_venta": {
//       "id": 3,
//       "idVoucherVenta": "vv001",
//       "idNotadeCD": "ncd001"
//     }
//   }