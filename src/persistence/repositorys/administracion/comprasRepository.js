import { CustomError } from "../../../utils/httpRes/handlerResponse.js";
import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class comprasRepository {
    async getDCByUser(user) {
        try {
            return await prisma.documento_compra.findMany({
                where: {
                    user: user
                }
            });
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getAllDC() {
        return await prisma.documento_compra.findMany();
    }
    createDocCompras (idDC, {user, numero_documento}){
        try {
            return prisma.documento_compra.create({
                data: {
                    id: idDC,
                    user,
                    numero_documento
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createFC (idFC,idDC,{factura, fact_excenta, idProvedoor,numero_documento, fecha, condicion_de_pago, cuenta, notas}){
        try {
            return prisma.factura_compra.create({
                data: {
                    id: idFC,
                    factura,
                    fact_excenta,
                    idDocCompra: idDC,
                    idProvedoor,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    condicion_de_pago,
                    cuenta,
                    notas,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
}