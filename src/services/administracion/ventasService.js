import ventasRepository from "../../persistence/repositorys/administracion/ventasRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
class VentasService {
    async createFV(data) {
        try {
            const idFV = idgenerate("FV")
            const idDV = idgenerate("DV")
            const {
                documento_venta,
                factura_venta,
                item_servicio_factura_venta,
                item_producto_factura_venta,
            } = data;
            const operations = [
                ventasRepository.createDocVentas(idDV, documento_venta),
                ventasRepository.createFacturaVenta(idFV,factura_venta),
                ventasRepository.createItemProductoFacturaVenta(item_servicio_factura_venta),
                ventasRepository.createItemServicioFacturaVenta(item_producto_factura_venta)
            ]
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations.map( op => op() ))
            return ("transacciones completas con exito", result)
        } catch (error) {
            throw error;
        }
    }
}


