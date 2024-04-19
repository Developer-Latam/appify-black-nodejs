import { CustomError } from "../../utils/httpRes/handlerResponse.js";
import comprasRepository from "../../persistence/repositorys/administracion/comprasRepository.js";
import executeTransactions from "../../persistence/transactions/executeTransaction.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
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
    async createFCE(data) {
        try {
            const {
                documento_compra,
                factura_compra_excenta,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta,
            } = data;
            //Validacion para asegurarse que al menos 1 de los dos items venga en la creacion de la factura
            if(!item_servicio_factura_compra_excenta && !item_producto_factura_compra_excenta){
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar la factura de compra exenta")
            }
            const idFCE = idgenerate("FCE")
            const idDC = idgenerate("DC")
            let operations = []
            operations.push(comprasRepository.createDocCompras(idDC, documento_compra));
            operations.push(comprasRepository.createFCE(idFCE, idDC, factura_compra_excenta ));
            // Agregar a operaciones para ítems de servicio si existen
            if (item_servicio_factura_compra_excenta && item_servicio_factura_compra_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemServicioPromises = comprasRepository.createItemServicioFCE(idFCE, item_servicio_factura_compra_excenta);
                operations.push(...itemServicioPromises);
            }
            // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
            if (item_producto_factura_compra_excenta && item_producto_factura_compra_excenta.length > 0) {
                 // Invocar la función y obtener la promesa Prisma
                const itemProductoPromises = comprasRepository.createItemProductoFCE(idFCE, item_producto_factura_compra_excenta);
                operations.push(...itemProductoPromises);
            }
            //Ejecutar las operaciones en una transaction
            const result = await executeTransactions(operations)
            return { message: "Transacciones FCE completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoDyItems(data) {
        try {
            const {
                notas_de_credito_debito_compras,
                nota_factura_compra,
                nota_factura_compra_excenta,
                nota_credito_nota_NC_compra,
                item_servicio_nota_credito_compra,
                item_producto_nota_credito_compra,
                item_servicio_nota_credito_NC_compra,
                item_producto_nota_credito_NC_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta
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
                return await this.createNCoDyItemsAnulaDoc_compra(idNCoD, data);
            } else if (notas_de_credito_debito_compras.corrige_monto === true) {
                return await this.createNCoDyItemsCorrigeMonto_compras(idNCoD, data);
            } else {
                throw new CustomError(400, "Bad Request", "Se requiere especificar si se anula o corrige el documento");
            }
        } catch (error) {
        throw error;
        }
    }
    async createNCoDyItemsAnulaDoc_compra(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito_compras,
                nota_factura_compra,
                nota_factura_compra_excenta,
                nota_credito_nota_NC_compra
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito_compras) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito_compras es obligatorio");
            }
            if (
                (nota_factura_compra && (nota_factura_compra_excenta || nota_credito_nota_NC_compra)) ||
                (nota_factura_compra_excenta && (nota_factura_compra || nota_credito_nota_NC_compra)) ||
                (nota_credito_nota_NC_compra && (nota_factura_compra || nota_factura_compra_excenta))
            ) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: nota_factura_compra, nota_factura_compra_excenta o nota_credito_nota_NC_compra");
            }
            let operations = [comprasRepository.createNCoD_Compras(idNCoD, notas_de_credito_debito_compras)];
            const items = [
                { item: nota_factura_compra, repository: comprasRepository.createNotaFC, idProperty: "idFacturaVenta" },//hay que cambiar esto
                { item: nota_factura_compra_excenta, repository: comprasRepository.createNotaFCE, idProperty: "idFacturaVentaExcenta" },//hay que cambiar esto
                { item: nota_credito_nota_NC_compra, repository: comprasRepository.createNotaNC}
            ];
            for (const { item, repository, idProperty } of items) {
            if (item) {
                if (idProperty) {
                operations.push(repository(item[idProperty], idNCoD));
                } else {
                operations.push(repository(item, idNCoD));
                }
            }
            }
            const result = await executeTransactions(operations);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC - COMPRAS) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    async createNCoDyItemsCorrigeMonto_compras(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito_compras,
                item_servicio_nota_credito_compra,
                item_producto_nota_credito_compra,
                item_servicio_nota_credito_NC_compra,
                item_producto_nota_credito_NC_compra,
                item_servicio_factura_compra,
                item_producto_factura_compra,
                item_servicio_factura_compra_excenta,
                item_producto_factura_compra_excenta
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito_compras) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito_compras es obligatorio");
            }
            if (!item_servicio_nota_credito_compra && !item_producto_nota_credito_compra && !item_servicio_nota_credito_compra && !item_producto_nota_credito_NC_compra && !item_servicio_factura_compra && !item_producto_factura_compra && !item_servicio_factura_compra_excenta && !item_producto_factura_compra_excenta) {
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento");
            }
            let operations = [comprasRepository.createNCoD_Compras(idNCoD, notas_de_credito_debito_compras)];
            // Determinar el conjunto de datos a procesar
            if (item_servicio_nota_credito_compra || item_producto_nota_credito_compra || item_servicio_nota_credito_NC_compra || item_producto_nota_credito_NC_compra) {
                // Primer camino: Nota de crédito/debito
                const itemsNC = [
                    { item: item_servicio_nota_credito_compra, repository: comprasRepository.createItemServicioForNCoD },
                    { item: item_producto_nota_credito_compra, repository: comprasRepository.createItemProductoForNCoD },
                    { item: item_servicio_nota_credito_NC_compra, repository: comprasRepository.createItemServicioForNCoD_NCOD },
                    { item: item_producto_nota_credito_NC_compra, repository: comprasRepository.createItemProductoForNCoD_NCOD },
                ];
                for (const { item, repository } of itemsNC) {
                    if (item && item.length > 0) {
                        const promise = repository(idNCoD, item);
                        operations.push(...promise);
                    }
                }
            } else if (item_servicio_factura_compra || item_producto_factura_compra || item_servicio_factura_compra_excenta || item_producto_factura_compra_excenta) {
                // Segundo camino: Factura venta y excenta
                let idFC;
                let idFCE;
                if(item_servicio_factura_compra || item_producto_factura_compra){
                    idFC = await comprasRepository.getFCidByIdDoc(notas_de_credito_debito_compras.idDoc);
                }
                if(item_servicio_factura_compra_excenta || item_producto_factura_compra_excenta){
                    idFCE = await ventasRepository.getFCEidByIdDoc(notas_de_credito_debito_compras.idDoc)
                }
                const itemsFC_FCE = [
                    { item: item_servicio_factura_compra, repository: comprasRepository.createItemServicioFC, id: idFC },
                    { item: item_producto_factura_compra, repository: comprasRepository.createItemProductoFC, id: idFC },
                    { item: item_servicio_factura_compra_excenta, repository: comprasRepository.createItemServicioFCE, id: idFCE },
                    { item: item_producto_factura_compra_excenta, repository: comprasRepository.createItemProductoFCE, id: idFCE },
                ];
                for (const { item, repository, id } of itemsFC_FCE) {
                    if (item && item.length > 0) {
                        const promise = repository(id, item);
                        operations.push(...promise);
                    }
                }
        } else {
            throw new CustomError(400, "Bad Request", "No se proporcionaron items válidos para procesar");
        }
            const result = await executeTransactions(operations);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE MONTO - COMPRA) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
}


export default new ComprasService()