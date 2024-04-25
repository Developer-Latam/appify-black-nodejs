import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../../utils/httpRes/handlePrismaError.js";
class ComercialRepository {
    createProyecto(empresaId, {valor_impuesto, porcentaje_de_ot, texto_para_compartir_proyecto, cotizacion_descuento_visible, nombre_impuesto}) {
        try {
            return prisma.empresa_proyecto.create({
                data: {
                    empresa: empresaId,
                    cotizacion_descuento_visible, 
                    nombre_impuesto
                }
            });
        } catch (error) {
            handlePrismaError(error)
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
    //{texto_inferior_firma, mensaje_envio_proyecto, texto_confirmacion_compra}
    createParaClientes(empresaId) {
        try {
            return prisma.para_clientes_proyectos.create({
                data: {
                    empresa: empresaId,
                }
            });
        } catch (error) {
            handlePrismaError(error)
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


export default new ComercialRepository()