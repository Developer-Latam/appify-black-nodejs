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
    createNCoD (idNCoD,{idDoc,idCliente,idVendedor,tipo_credito, tipo_debito, numero_documento,tipo_nota,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna}){
        try {
            return prisma.notas_de_credito_debito.create({
                data: {
                    id: idNCoD,
                    //numero del documento de venta que proviene del sii, del detalle de la factura del sii
                    idDoc,
                    idCliente,
                    idVendedor,
                    tipo_credito,
                    tipo_debito,
                    //numero que viene de SII
                    numero_documento,
                    tipo_nota,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
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
    createNotaNC({idNotadeCD,numero_documento, tipo_nota, fecha, motivo_referencia, centro_de_beneficio, observacion, nota_interna}) {
        try {
            return prisma.nota_credito_nota_NC.create({
                data: {
                    idNotadeCD,
                    //numero que viene del sii
                    numero_documento,
                    tipo_nota,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
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