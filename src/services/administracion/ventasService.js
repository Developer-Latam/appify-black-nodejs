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
            if(!item_servicio_factura_venta && !item_producto_factura_venta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de venta")
            }
            const idFV = idgenerate("FV")
            const idDV = idgenerate("DV")
            let operations = []
            operations.push(ventasRepository.createDocVentas(idDV, documento_venta));
            operations.push(ventasRepository.createFV(idFV, idDV, factura_venta ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_venta && item_servicio_factura_venta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = ventasRepository.createItemServicioFV(idFV, item_servicio_factura_venta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_venta && item_producto_factura_venta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = ventasRepository.createItemProductoFV(idFV, item_producto_factura_venta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FV completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createFVE(data) {
        try {
            const {
                documento_venta,
                factura_venta_excenta,
                item_servicio_factura_venta_excenta,
                item_producto_factura_venta_excenta,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_venta_excenta && !item_producto_factura_venta_excenta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de venta exenta")
            }
            const idFVE = idgenerate("FVE")
            const idDV = idgenerate("DV")
            let operations = []
            operations.push(ventasRepository.createDocVentas(idDV, documento_venta));
            operations.push(ventasRepository.createFVE(idFVE, idDV, factura_venta_excenta ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_venta_excenta && item_servicio_factura_venta_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = ventasRepository.createItemServicioFVE(idFVE, item_servicio_factura_venta_excenta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_venta_excenta && item_producto_factura_venta_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = ventasRepository.createItemProductoFVE(idFVE, item_producto_factura_venta_excenta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FVE completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoD(data) {
        try {
            const {
                notas_de_credito_debito,
                nota_factura_venta,
                nota_factura_venta_excenta,
                nota_voucher_venta,
            } = data;
            const idNCoD = idgenerate("NC")
            let operations = []
            operations.push(ventasRepository.createNCoD(idNCoD, notas_de_credito_debito ));
            // Determina qué tipo de nota adicional crear y prepara la operación correspondiente
            if (nota_factura_venta) {
                operations.push(ventasRepository.createNotaFV(nota_factura_venta.idFacturaVenta, idNCoD));
            } else if (nota_factura_venta_excenta) {
                operations.push(ventasRepository.createNotaFVE(nota_factura_venta_excenta.idFacturaVentaExcenta, idNCoD));
            } else if (nota_voucher_venta) {
                operations.push(ventasRepository.createNotaVV(nota_voucher_venta.idVoucherVenta, idNCoD));
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
}


export default new VentasService()

1