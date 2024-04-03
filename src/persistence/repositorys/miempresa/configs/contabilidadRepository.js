import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";

class ContabilidadRepository {
    async createFE(recibir_doc_libre_DTE_automatico, contrasena_sii, folio_factura_excenta, folio_facura, folio_factura_compra, folio_nota_debito, folio_nota_credito, folio_guia_despacho, folio_boleta_excenta, folio_boleta_fisica, folio_boleta_electronica, set_factura_basica, set_boletas, set_facturas_exportacion, set_facturas_compra) {
        try {
            return await prisma.facturacion_electronica.create({
                data: {
                    empresa: 1,
                    recibir_doc_libre_DTE_automatico,
                    contrasena_sii: "contraseña hasheada", 
                    folio_factura_excenta, 
                    folio_facura, 
                    folio_factura_compra, 
                    folio_nota_debito,
                    folio_nota_credito,
                    folio_guia_despacho,
                    folio_boleta_excenta,
                    folio_boleta_fisica,
                    folio_boleta_electronica,
                    set_factura_basica,
                    set_boletas,
                    set_facturas_exportacion,
                    set_facturas_compra
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async updateFE(id, data) {
        try {
            return await prisma.facturacion_electronica.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async deleteFE(id) {
        try {
            return await prisma.facturacion_electronica.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async createCobranza(asunto, mensaje_nivel_1, mensaje_nivel_2, mensaje_nivel_3) {
        try {
            return await prisma.cobranzas.create({
                data: {
                    empresa: 1,
                    asunto,
                    mensaje_nivel_1,
                    mensaje_nivel_2,
                    mensaje_nivel_3
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async updateCobranza(id, data) {
        try {
            return await prisma.cobranzas.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createModuloAdm(cuenta_impuesto_debito, cuenta_impuesto_credito, valor_impuesto_retenido, cuenta_impuesto_no_recuperable, plazo_no_recuperable, cuenta_retencion_impuesto, cuenta_impuesto_especifico) {
        try {
            return await prisma.administracion_impuesto.create({
                data: {
                    empresa: 1,
                    cuenta_impuesto_debito,
                    cuenta_impuesto_credito,
                    valor_impuesto_retenido,
                    cuenta_impuesto_no_recuperable,
                    plazo_no_recuperable,
                    cuenta_retencion_impuesto,
                    cuenta_impuesto_especifico
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async updateModuloAdm(id, data) {
        try {
            return await prisma.administracion_impuesto.update({
                where: { id },
                data,
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createAdmAnticipo(cuenta_anticipo_clientes, cuenta_anticipo_proveedores, cuenta_balance_apertura, cuenta_ajuste_cambario, cuenta_boton_pago, cuenta_beneficios_defecto) {
        try {
            return await prisma.administracion_anticipo.create({
                data: {
                    empresa: 1,
                    cuenta_anticipo_clientes,
                    cuenta_anticipo_proveedores,
                    cuenta_balance_apertura,
                    cuenta_ajuste_cambario,
                    cuenta_boton_pago,
                    cuenta_beneficios_defecto
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createAdmPorClasificar(cuenta_documentos_pendientes_clasificar) {
        try {
            return await prisma.administracion_por_clasificar.create({
                data: {
                    empresa: 1,
                    cuenta_documentos_pendientes_clasificar
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createAdmPorCobrar(cuenta_facturas_por_cobrar, cuenta_documentos_en_cartera_por_cobrar) {
        try {
            return await prisma.administracion_por_cobrar.create({
                data: {
                    empresa: 1,
                    cuenta_facturas_por_cobrar,
                    cuenta_documentos_en_cartera_por_cobrar
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async createAdmPorPagar(cuenta_honorarios_por_pagar, cuenta_facturas_por_pagar, cuenta_vouchers_por_pagar, cuenta_documentos_por_pagar) {
        try {
            return await prisma.administracion_por_pagar.create({
                data: {
                    empresa: 1,
                    cuenta_honorarios_por_pagar,
                    cuenta_facturas_por_pagar,
                    cuenta_vouchers_por_pagar,
                    cuenta_documentos_por_pagar
                }
            });
        } catch (error) {
            if (error instanceof prismaError.PrismaClientKnownRequestError) {
                throw new CustomError(500, "Bad Request, Valor fuera de rango", {error: error.message})
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
}


export default new ContabilidadRepository()