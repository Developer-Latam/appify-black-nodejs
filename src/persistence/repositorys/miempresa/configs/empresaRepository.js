import { CustomError } from "../../../../utils/httpRes/handlerResponse.js";
import { prisma } from "../../../../utils/dependencys/injection.js";
import pkg from '@prisma/client';
const { PrismaClientKnownRequestError } = pkg;
class EmpresaRepository {
    async createEmpresa(user, nombre, direccion_matriz, direccion_bodega, prefijo_tel, RUT, giro, pagina_web, prefijo_cel) {
        try {
            return await prisma.empresa.create({
                data: {
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
            if (error instanceof PrismaClientKnownRequestError) {
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
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async deleteEmpresa(id) {
        try {
            return await prisma.empresa.delete({ where: { id } });
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
    async getAllEmpresas() {
        try {
            return await prisma.empresa.findMany();
        } catch (error) {
            throw new CustomError(500, "Error process db", {error: error.message})
        }
    }
}

export default new EmpresaRepository()