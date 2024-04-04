import { prisma, prismaError } from "../../../utils/dependencys/injection.js";
import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { idgenerate } from "../../../utils/id/idGenerate.js";
class VentasRepository {
    createDocVentas ({idGenerate,recurrente}){
        return ()=>{
            try {
                prisma.documento_venta.create({
                    data: {
                        id: idGenerate,
                        user: "sub-user-9a84cf81-d493-4320-be9d-99e45da9fe6e",
                        recurrente
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
    }
    createFacturaVenta ({idFV,idDV,idCliente, tipo_documento, numero_documento, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
        return ()=>{
            try {
                prisma.factura_venta.create({
                    data: {
                        id: idFV,
                        idDoc: idDV,
                        idCliente: "cliente-26a583c8-5130-48a6-82eb-4796430bb354",
                        tipo_documento,
                        numero_documento: "numero que viene de SII",
                        fecha: new Date(),
                        idVendedor: "sub-user-b6034146-e508-4da5-bad9-eb7ec18fa5d7",
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
    }
    createItemServicioFacturaVenta ({idServicio,idFV,codigo, cantidad, unitario, bruto, neto, cuenta, bonificacion, notas}){
        return ()=>{
            try {
                prisma.item_servicio_factura_venta.create({
                    data: {
                        idServicio: idServicio,
                        idFactura: idFV,
                        codigo,
                        cantidad,
                        unitario,
                        bruto,
                        neto,
                        cuenta,
                        bonificacion,
                        notas,
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
    }
    createItemProductoFacturaVenta ({idProducto,idFV,codigo, cantidad, unitario, bruto, neto, cuenta, bonificacion, notas}){
        return () => {
            try {
                prisma.item_producto_factura_venta.create({
                    data: {
                        idProducto: idProducto,
                        idFactura: idFV,
                        codigo,
                        cantidad,
                        unitario,
                        bruto,
                        neto,
                        cuenta,
                        bonificacion,
                        notas,
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