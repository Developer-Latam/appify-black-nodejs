import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma, prismaError } from "../../../../utils/dependencys/injection.js";

class ItemSistemaRepository {
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
            if (error instanceof prismaError.PrismaClientValidationError) {
                // Error específico de Prisma por tipo de dato incorrecto
                throw new CustomError(400, 'Bad Request', 'Invalid value provided for one or more fields.');
            } else {
                throw new CustomError(500, "Internal server error", {error: error.message})
            }
        }
    }
    async deleteSistema(id) {
        try {
            return await prisma.sistema.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel) {
        try {
            return await prisma.empresa.create({
                data: {
                    id: "empresa-id",
                    user,
                    logo: "URL SACADA DE FIREBASE",
                    nombre, 
                    direccion_matriz, 
                    direccion_bodega, 
                    prefijo_tel, 
                    RUT, 
                    giro, 
                    pagina_web, 
                    prefijo_cel
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
    async getEmpresaByRUT(rut) {
        try {
            return await prisma.empresa.findFirst({ 
                where: { 
                    RUT: rut 
                } 
            });
        } catch (error) {
            throw new CustomError(500, "Internal server error", {error: error.message})
        }
    }
    async updateEmpresa(id, data) {
        try {
            return await prisma.empresa.update({
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
    async deleteEmpresa(id) {
        try {
            return await prisma.empresa.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    
}

export default new ItemSistemaRepository()