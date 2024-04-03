import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";
class ComercialRepositoy {
    async createProyecto(valor_impuesto, porcentaje_de_ot, texto_para_compartir_proyecto, cotizacion_descuento_visible, nombre_impuesto) {
        try {
            return await prisma.empresa_proyecto.create({
                data: {
                    empresa: 1,
                    valor_impuesto,
                    logo: "URL SACADA DE FIREBASE", 
                    porcentaje_de_ot, 
                    texto_para_compartir_proyecto, 
                    cotizacion_descuento_visible, 
                    nombre_impuesto
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
    async updateProyecto(id, data) {
        try {
            return await prisma.empresa_proyecto.update({
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
    async deleteProyecto(id) {
        try {
            return await prisma.empresa_proyecto.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async createParaClientes(texto_inferior_firma, mensaje_envio_proyecto, texto_confirmacion_compra) {
        try {
            return await prisma.para_clientes_proyectos.create({
                data: {
                    empresa: 1,
                    texto_inferior_firma,
                    mensaje_envio_proyecto,
                    texto_confirmacion_compra
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
    async updateParaClientes(id, data) {
        try {
            return await prisma.para_clientes_proyectos.update({
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
}


export default new ComercialRepositoy()