import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";

class SistemaRepository {
    async createSistema(empresa	, pais, idioma, correo_cobranza, moneda, moneda_secundaria, con_decimales, tasa_venta, tasa_compra, tasa_cambio, tolerancia, registro_entregas_autocompletar) {
        try {
            return await prisma.sistema.create({
                data: {
                    empresa,
                    pais,
                    idioma, 
                    correo_cobranza, 
                    moneda, 
                    moneda_secundaria, 
                    con_decimales, 
                    tasa_venta, 
                    tasa_compra, 
                    tasa_cambio,
                    tolerancia,
                    registro_entregas_autocompletar,
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
    async updateSistema(id, data) {
        try {
            return await prisma.sistema.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async deleteSistema(id) {
        try {
            return await prisma.sistema.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async getAllSistema() {
        try {
            return await prisma.sistema.findMany();
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
}

export default new SistemaRepository()