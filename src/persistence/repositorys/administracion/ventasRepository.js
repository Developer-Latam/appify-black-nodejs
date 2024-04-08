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
    createFacturaVenta (idFV,idDV,{idCliente, tipo_documento, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
        
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
    createItemServicioFacturaVenta (idFV,itemsServicio){
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
    createItemProductoFacturaVenta (idFV,itemsProducto){
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