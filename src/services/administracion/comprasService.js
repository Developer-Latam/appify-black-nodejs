import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import comprasRepository from "../../persistence/repositorys/administracion/comprasRepository.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
class ComprasService {
    async getAllDocCompra(){
        try {
            return await comprasRepository.getAllDC();
        } catch (error) {
            throw error
        }
    }
    async getDCByUser(user){
        try {
            if (!user) {
                throw new CustomError(400, "Bad Request", "El usuario no puede estar vacío");
            }
            return await comprasRepository.getDCByUser(user);
        } catch (error) {
            throw error
        }
    }
    async createFC(data) {
        try {
            const {
                documento_compra,
                factura_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_compra && !item_producto_factura_compra){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de compra")
            }
            const idFC = idgenerate("FC")
            const idDC = idgenerate("DC")
            let operations = []
            operations.push(comprasRepository.createDocCompras(idDC, documento_compra));
            operations.push(comprasRepository.createFC(idFC, idDC, factura_compra ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_compra && item_servicio_factura_compra.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = comprasRepository.createItemServicioFC(idFC, item_servicio_factura_compra);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_compra && item_producto_factura_compra.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = comprasRepository.createItemProductoFC(idFC, item_producto_factura_compra);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FC completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoDItemsCompra(data) {
        try {
            const {
                notas_de_credito_debito_compras,
                item_servicio_nota_CD,
                item_producto_nota_CD
            } = data;
            let idNCoD;
            if(notas_de_credito_debito_compras.tipo_debito === true){
                idNCoD = idgenerate("ND")
            } else {
                idNCoD = idgenerate("NC")
            }
            if (notas_de_credito_debito_compras.anula_doc === true && notas_de_credito_debito_compras.corrige_monto === true) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: anular o corregir el documento");} 
            else if (notas_de_credito_debito_compras.anula_doc === true) {
                return await this.createNCoDyItemsAnulaDoc(idNCoD, data);
            } else if (notas_de_credito_debito_compras.corrige_monto === true) {
                return await this.createNCoDyItemsCorrigeMonto(idNCoD, data);
            } else {
                throw new CustomError(400, "Bad Request", "Se requiere especificar si se anula o corrige el documento");
            }
        } catch (error) {
        throw error;
        }
    }
}