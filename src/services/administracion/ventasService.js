import ventasRepository from "../../persistence/repositorys/administracion/ventasRepository.js";
import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
class VentasService {
    async createFV(data) {
        try {
            
            const {
                documento_venta,
                factura_venta,
                item_servicio_factura_venta,
                item_producto_factura_venta,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            // if(!item_servicio_factura_venta && !item_producto_factura_venta){
            //     throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de venta")
            // }
            const idFV = idgenerate("FV")
            const idDV = idgenerate("DV")
            const operations = [
                ventasRepository.createDocVentas(idDV),
                ventasRepository.createFacturaVenta(idFV,factura_venta),
            ]
            // if(item_servicio_factura_venta){
            //     operations.push(ventasRepository.createItemServicioFacturaVenta(item_servicio_factura_venta))
            // }
            // if(item_producto_factura_venta){
            //     operations.push(ventasRepository.createItemProductoFacturaVenta(item_producto_factura_venta))
            // }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations.map( op => op() ))
            return ("transacciones completas con exito", result)
        } catch (error) {
            throw error;
        }
    }
}


export default new VentasService()

1