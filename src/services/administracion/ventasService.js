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
    // async createNCoDyItems(data){
    //     try {
    //         const {
    //             notas_de_credito_debito,
    //             nota_factura_venta,
    //             nota_factura_venta_excenta,
    //             nota_credito_nota_NC,
    //             item_servicio_nota_credito,
    //             item_producto_nota_credito
    //         } = data;
    //         let idNCoD;
    //         let operations = []
    //         if(notas_de_credito_debito.tipo_debito === true){
    //             idNCoD = idgenerate("ND")
    //         } else {
    //             idNCoD = idgenerate("NC")
    //         }
    //         if(notas_de_credito_debito.anula_doc === true){
    //             console.log("entre a anula doc")
    //             operations.push(ventasRepository.createNCoD(idNCoD, notas_de_credito_debito ));
    //              // Determina qué tipo de nota adicional crear y prepara la operación correspondiente
    //              //ACA SE DETALLAN LOS TIPOS DE DOCUMENTOS RELACIONADOS A LA NOTA DE CREDITO/DEBITO
    //             if (nota_factura_venta) {
    //                 operations.push(ventasRepository.createNotaFV(nota_factura_venta.idFacturaVenta, idNCoD));
    //             } else if (nota_factura_venta_excenta) {
    //                 operations.push(ventasRepository.createNotaFVE(nota_factura_venta_excenta.idFacturaVentaExcenta, idNCoD));
    //             } else if (nota_credito_nota_NC) {
    //                 operations.push(ventasRepository.createNotaNC(nota_credito_nota_NC));
    //             }
    //             //Ejecutar las operaciones en una transaction
    //             const result = await executeTransactions(operations)
    //             return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC) completas con éxito", result };
    //         }
    //         if(notas_de_credito_debito.corrige_monto === true){
    //             if(!item_servicio_nota_credito && !item_producto_nota_credito){
    //             throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento")
    //             }
    //             operations.push(ventasRepository.createNCoD(idNCoD, notas_de_credito_debito ));
    //             if (item_servicio_nota_credito && item_servicio_nota_credito.length > 0) {
    //                 // Invocar la función y obtener la promesa Prisma
    //                 const itemServicioPromiseNCoD = ventasRepository.createItemServicioForNCoD(idNCoD,item_servicio_nota_credito);
    //                 operations.push(...itemServicioPromiseNCoD);
    //             }
    //              // Agregar operaciones para ítems de producto si existen (asumiendo una función similar para productos)
    //             if (item_producto_nota_credito && item_producto_nota_credito.length > 0) {
    //                 // Invocar la función y obtener la promesa Prisma
    //             const itemProductoPromiseNCoD = ventasRepository.createItemProductoForNCoD(idNCoD, item_producto_nota_credito);
    //             operations.push(...itemProductoPromiseNCoD);
    //             }
    //             //Ejecutar las operaciones en una transaction
    //             const result = await executeTransactions(operations)
    //             return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE DOC) completas con éxito", result };
    //         }   
    //     } catch (error) {
    //         throw error
    //     }
    // }
    async createNCoDyItems(data) {
        try {
            const {
                notas_de_credito_debito,
                nota_factura_venta,
                nota_factura_venta_excenta,
                nota_credito_nota_NC,
                item_servicio_nota_credito,
                item_producto_nota_credito,
                item_servicio_nota_credito_NC,
                item_producto_nota_credito_NC
            } = data;
            let idNCoD;
            if(notas_de_credito_debito.tipo_debito === true){
                idNCoD = idgenerate("ND")
            } else {
                idNCoD = idgenerate("NC")
            }
            if (notas_de_credito_debito.anula_doc === true && notas_de_credito_debito.corrige_monto === true) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: anular o corregir el documento");} 
            else if (notas_de_credito_debito.anula_doc === true) {
                return await this.createNCoDyItemsAnulaDoc(idNCoD, data);
            } else if (notas_de_credito_debito.corrige_monto === true) {
                return await this.createNCoDyItemsCorrigeMonto(idNCoD, data);
            } else {
                throw new CustomError(400, "Bad Request", "Se requiere especificar si se anula o corrige el documento");
            }
        } catch (error) {
        throw error;
        }
    }
    async createNCoDyItemsAnulaDoc(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito,
                nota_factura_venta,
                nota_factura_venta_excenta,
                nota_credito_nota_NC
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito es obligatorio");
            }
            if (
                (nota_factura_venta && (nota_factura_venta_excenta || nota_credito_nota_NC)) ||
                (nota_factura_venta_excenta && (nota_factura_venta || nota_credito_nota_NC)) ||
                (nota_credito_nota_NC && (nota_factura_venta || nota_factura_venta_excenta))
            ) {
                throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: nota_factura_venta, nota_factura_venta_excenta o nota_credito_nota_NC");
            }
            let operations = [ventasRepository.createNCoD(idNCoD, notas_de_credito_debito)];
            const items = [
                { item: nota_factura_venta, repository: ventasRepository.createNotaFV, idProperty: "idFacturaVenta" },
                { item: nota_factura_venta_excenta, repository: ventasRepository.createNotaFVE, idProperty: "idFacturaVentaExcenta" },
                { item: nota_credito_nota_NC, repository: ventasRepository.createNotaNC }
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
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
    // async createNCoDyItemsAnulaDoc(idNCoD,data) {
    //     try {
    //         const {
    //             notas_de_credito_debito,
    //             nota_factura_venta,
    //             nota_factura_venta_excenta,
    //             nota_credito_nota_NC
    //         } = data;
    //          // Validación
    //         if (!notas_de_credito_debito) {
    //             throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito es obligatorio");
    //         }
    //         if (
    //             (nota_factura_venta && (nota_factura_venta_excenta || nota_credito_nota_NC)) ||
    //             (nota_factura_venta_excenta && (nota_factura_venta || nota_credito_nota_NC)) ||
    //             (nota_credito_nota_NC && (nota_factura_venta || nota_factura_venta_excenta))
    //         ) {
    //             throw new CustomError(400, "Bad Request", "Solo se puede especificar una opción: nota_factura_venta, nota_factura_venta_excenta o nota_credito_nota_NC");
    //         }
    //         let operations = [];
    //         operations.push(ventasRepository.createNCoD(idNCoD, notas_de_credito_debito));
    //         if (nota_factura_venta) {
    //             operations.push(ventasRepository.createNotaFV(nota_factura_venta.idFacturaVenta, idNCoD));
    //         } else if (nota_factura_venta_excenta) {
    //             operations.push(ventasRepository.createNotaFVE(nota_factura_venta_excenta.idFacturaVentaExcenta, idNCoD));
    //         } else if (nota_credito_nota_NC) {
    //             operations.push(ventasRepository.createNotaNC(nota_credito_nota_NC));
    //         }
    //         const result = await executeTransactions(operations);
    //         return { message: "Transacciones (NOTA DE CREDITO/DEBITO - ANULA DOC) completas con éxito", result };
    //     } catch (error) {
    //     throw error;
    //     }
    // }
    // async createNCoDyItemsCorrigeMonto(idNCoD,data) {
    //     try {
    //         const {
    //             notas_de_credito_debito,
    //             item_servicio_nota_credito,
    //             item_producto_nota_credito,
    //             item_servicio_nota_credito_NC,
    //             item_producto_nota_credito_NC
    //         } = data;
    //         let operations = [];
    //         if (!item_servicio_nota_credito &&!item_producto_nota_credito) {
    //             throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento");
    //         }
    //         operations.push(ventasRepository.createNCoD(idNCoD, notas_de_credito_debito));
    //         if (item_servicio_nota_credito && item_servicio_nota_credito.length > 0) {
    //             const itemServicioPromiseNCoD = ventasRepository.createItemServicioForNCoD(idNCoD, item_servicio_nota_credito);
    //             operations.push(...itemServicioPromiseNCoD);
    //         }
    //         if (item_producto_nota_credito && item_producto_nota_credito.length > 0) {
    //             const itemProductoPromiseNCoD = ventasRepository.createItemProductoForNCoD(idNCoD, item_producto_nota_credito);
    //             operations.push(...itemProductoPromiseNCoD);
    //         }
    //         if (item_servicio_nota_credito_NC && item_servicio_nota_credito_NC.length > 0) {
    //             const itemServicioPromiseNCoD_NCOD = ventasRepository.createItemServicioForNCoD_NCOD(idNCoD, item_servicio_nota_credito_NC);
    //             operations.push(...itemServicioPromiseNCoD_NCOD);
    //         }
    //         if (item_producto_nota_credito_NC && item_producto_nota_credito_NC.length > 0) {
    //             const itemProductoPromiseNCoD_NCOD = ventasRepository.createItemProductoForNCoD_NCOD(idNCoD, item_producto_nota_credito_NC);
    //             operations.push(...itemProductoPromiseNCoD_NCOD);
    //         }
    //         const result = await executeTransactions(operations);
    //         return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE MONTO) completas con éxito", result };
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    async createNCoDyItemsCorrigeMonto(idNCoD, data) {
        try {
            const {
                notas_de_credito_debito,
                item_servicio_nota_credito,
                item_producto_nota_credito,
                item_servicio_nota_credito_NC,
                item_producto_nota_credito_NC
            } = data;
            // Validación adicional
            if (!notas_de_credito_debito) {
                throw new CustomError(400, "Bad Request", "El parámetro notas_de_credito_debito es obligatorio");
            }
            if (!item_servicio_nota_credito && !item_producto_nota_credito && !item_servicio_nota_credito_NC && !item_producto_nota_credito_NC) {
                throw new CustomError(400, "Bad Request", "Se requiere al menos un item de servicio o producto para realizar este movimiento");
            }
            let operations = [ventasRepository.createNCoD(idNCoD, notas_de_credito_debito)];
            const items = [
                { item: item_servicio_nota_credito, repository: ventasRepository.createItemServicioForNCoD },
                { item: item_producto_nota_credito, repository: ventasRepository.createItemProductoForNCoD },
                { item: item_servicio_nota_credito_NC, repository: ventasRepository.createItemServicioForNCoD_NCOD },
                { item: item_producto_nota_credito_NC, repository: ventasRepository.createItemProductoForNCoD_NCOD }
            ];
            for (const { item, repository } of items) {
                if (item && item.length > 0) {
                const promise = repository(idNCoD, item);
                operations.push(...promise);
                }
            }
            const result = await executeTransactions(operations);
            return { message: "Transacciones (NOTA DE CREDITO/DEBITO - CORRIGE MONTO) completas con éxito", result };
        } catch (error) {
            throw error;
        }
    }
}


export default new VentasService()

1