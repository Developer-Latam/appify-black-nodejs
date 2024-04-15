import { prisma, prismaError } from "../../../utils/dependencys/injection.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../../utils/id/idGenerate.js";

class VentasRepository {
    createDocVentas (idDV, {user}){
            try {
                return prisma.documento_venta.create({
                    data: {
                        id: idDV,
                        user,
                        numero_documento: "numero que viene de SII"
                    }
                })
            } catch (error) {
                if (error instanceof prismaError.PrismaClientValidationError) {
                    // Error específico de Prisma por tipo de dato incorrecto
                    throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
                } else {
                    throw new CustomError(500, "Internal server error", {error: error.message})
                }
            }
    }
    createDD (idDD, {user, venta, traslado}){
        try {
            return prisma.documento_despacho.create({
                data: {
                    id: idDD,
                    user,
                    venta,
                    traslado
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemProductoDDV(idDDV, itemsProductoDDV) {
        try {
            const op = itemsProductoDDV.map(item => prisma.item_producto_documento_despacho_venta.create({
                data: {
                    id: idgenerate("DDV-PROD"),
                    idProducto: item.idProducto,
                    idDocumentoVenta: idDDV,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    costo_unitario: item.costo_unitario,
                    subtotal: item.subtotal,
                    iva: item.iva,
                    total_con_iva: item.total_con_iva
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    createItemDespachoVentaOt(idDDV, itemsDVot) {
        try {
            const op = itemsDVot.map(item => prisma.item_despacho_venta_ot.create({
                data: {
                    id: idgenerate("DDV-OT"),
                    idOt: item.idOt,
                    idDespachoVenta: idDDV
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    createDocDespachoVenta(idDDV, idDD, {fecha, idCliente, idTransportista, ot, fact_libre, punto, direccion_destino, comuna, ciudad, observacion, numero_documento}) {
        try {
            return prisma.documento_despacho_venta.create({
                data: {
                id: idDDV,
                idDoc: idDD,
                fecha,
                idCliente,
                idTransportista,
                ot,
                fact_libre,
                punto,
                direccion_destino,
                comuna,
                ciudad,
                observacion, 
                numero_documento
            }
            });
        } catch (error) {
            if (error instanceof prismaError.ValidationError) {
                // Error específico de Sequelize por validación de tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    createDDT(idDDT, idDD, {fecha, idCliente, idTransportista, punto, direccion_destino, comuna, ciudad, observacion, numero_documento}) {
        try {
            return prisma.documento_despacho_traslado.create({
                data: {
                    id: idDDT,
                    idDoc: idDD,
                    fecha,
                    idCliente,
                    idTransportista,
                    punto,
                    direccion_destino,
                    comuna,
                    ciudad,
                    observacion,
                    numero_documento,
                    ot, 
                    fact_libre
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    createItemDespachoTrasladoOt(idDDT, {idOt}) {
        try {
            return prisma.item_despacho_traslado_ot.create({
                data: {
                    id: idgenerate("DDT-OT"),
                    idOt: idOt,
                    idDespachoTraslado: idDDT
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    createItemProductoDDT(idDDV, {idProducto, cantidad, unitario}) {
        try {
            return prisma.item_producto_documento_despacho_traslado.create({
                data: {
                    id: idgenerate("DDT-PROD"),
                    idProducto,
                    idDocumentoVenta: idDDV,
                    cantidad,
                    unitario
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message});
            }
        }
    }
    
    createFV (idFV,idDV,{idCliente, tipo_documento, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
            try {
                return prisma.factura_venta.create({
                    data: {
                        id: idFV,
                        idDoc: idDV,
                        idCliente,
                        tipo_documento,
                        //numero que viene de SII
                        numero_documento,
                        fecha,
                        idVendedor,
                        condicion_de_pago,
                        centro_beneficio,
                        observacion,
                        nota_interna
                    }
                })
            } catch (error) {
                if (error instanceof prismaError.PrismaClientValidationError) {
                    // Error específico de Prisma por tipo de dato incorrecto
                    throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
                } else {
                    throw new CustomError(500, "Internal server error", {error: error.message})
                }
            }
    }
    async getFVidByIdDoc(idDoc){
        try {
            const facturaVenta = await prisma.factura_venta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaVenta ? facturaVenta.id : null;
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemServicioFV (idFV,itemsServicio){
        try {
            const op = itemsServicio.map(item => prisma.item_servicio_factura_venta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFV,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemProductoFV (idFV,itemsProducto){
        try {
            const operations = itemsProducto.map(item => prisma.item_producto_factura_venta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFV,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createFVE (idFVE,idDV,{idCliente, tipo_documento, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
        try {
            return prisma.factura_venta_excenta.create({
                data: {
                    id: idFVE,
                    idDoc: idDV,
                    idCliente,
                    tipo_documento,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    idVendedor,
                    condicion_de_pago,
                    centro_beneficio,
                    observacion,
                    nota_interna
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async getFVEidByIdDoc(idDoc){
        try {
            const facturaVentaExenta = await prisma.factura_venta_excenta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaVentaExenta ? facturaVentaExenta.id : null;
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemServicioFVE (idFVE,itemsServicioFVE){
        try {
            const op = itemsServicioFVE.map(item => prisma.item_servicio_factura_venta_excenta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFVE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemProductoFVE (idFVE,itemsProductoFVE){
        try {
            const operations = itemsProductoFVE.map(item => prisma.item_producto_factura_venta_excenta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFVE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createNCoD (idNCoD,{idDoc,idCliente,idVendedor,tipo_credito, tipo_debito, numero_documento,tipo_nota,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna, anula_doc, corrige_monto}){
        try {
            return prisma.notas_de_credito_debito.create({
                data: {
                    id: idNCoD,
                    //numero del documento a anular o cambiar items, numero de referencia al documento
                    idDoc,
                    idCliente,
                    idVendedor,
                    tipo_credito,
                    tipo_debito,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
                    observacion,
                    nota_interna,
                    anula_doc,
                    corrige_monto
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createNotaFV(idFV, idNCoD) {
        try {
            return prisma.nota_factura_venta.create({
                data: {
                    idFacturaVenta: idFV,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createNotaFVE(idFVE, idNCoD) {
        try {
            return prisma.nota_factura_venta_excenta.create({
                data: {
                    //NUMERO DE LA FACTURA DE VENTA EXCENTA
                    idFacturaVentaExcenta: idFVE,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createNotaNC({numero_documento, idNotadeCD}) {
        try {
            return prisma.nota_credito_nota_NC.create({
                data: {
                    //id de la nota de credito a anular
                    idNotadeCD,
                    //numero que viene del sii
                    numero_documento,
                }
            })
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    
    createItemServicioForNCoD (idNCoD,itemsServicioNCoD){
        try {
            const op = itemsServicioNCoD.map(item => prisma.item_servicio_nota_credito.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemProductoForNCoD (idNCoD,itemsProductoNCoD){
        try {
            const operations = itemsProductoNCoD.map(item => prisma.item_producto_nota_credito.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemServicioForNCoD_NCOD (idNCoD,itemsServicioNCoD_NC){
        try {
            const op = itemsServicioNCoD_NC.map(item => prisma.item_servicio_nota_credito_NC.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    createItemProductoForNCoD_NCOD (idNCoD,itemsProductoNCoD_NC){
        try {
            const operations = itemsProductoNCoD_NC.map(item => prisma.item_producto_nota_credito_NC.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCredito: idNCoD,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    bruto: item.bruto,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async EXAMPLE (){
        try {
            
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createDocDespacho (){
        try {
            
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async getDocEmitidas (){
        try {
            
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async getDocPendientes (){
        try {
            
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async getDocRecurrentes (){
        try {
            
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    
}


export default new VentasRepository()