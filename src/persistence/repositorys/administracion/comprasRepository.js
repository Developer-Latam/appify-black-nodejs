import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
import { idgenerate } from "../../../utils/id/idGenerate.js";
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
    async getFCidByIdDoc(idDocCompra){
        try {
            const facturaCompra = await prisma.factura_compra.findFirst({
                where: {
                    idDocCompra: idDocCompra
                },
                select: {
                    id: true 
                }
            });
            return facturaCompra ? facturaCompra.id : null;
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioFC (idFC,itemsServicio){
        try {
            const op = itemsServicio.map(item => prisma.item_servicio_factura_compra.create({
                data: {
                    id: idgenerate("FC-SERVICE"),
                    idServicio: item.idServicio,
                    idFacturaCompra: idFC,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                    neto: item.neto,
                    subtotal: item.subtotal,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoFC (idFC,itemsProducto){
        try {
            const operations = itemsProducto.map(item => prisma.item_producto_factura_compra.create({
                data: {
                    id: idgenerate("FC-PRODUCT"),
                    idProducto: item.idProducto,
                    idFacturaCompra: idFC,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    cuenta: item.cuenta,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNCoD_Compras (idNCoD_Compras,{idDoc,idProveedor,idVendedor,tipo_credito, tipo_debito, numero_documento,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna, anula_doc, corrige_monto}){
        try {
            return prisma.notas_de_credito_debito_compras.create({
                data: {
                    id: idNCoD_Compras,
                    //numero del documento a anular o cambiar items, numero de referencia al documento
                    idDoc,
                    idProveedor,
                    idVendedor,
                    tipo_credito,
                    tipo_debito,
                    anula_doc,
                    corrige_monto,
                    //numero que viene de SII
                    numero_documento,
                    fecha,
                    motivo_referencia,
                    centro_de_beneficio,
                    observacion,
                    nota_interna
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    async getNCoDComprasbyIdDoc(DCID) {
        try {
            const notas = await prisma.notas_de_credito_debito_compras.findMany({
                where: {
                  idDoc: DCID, // Filtra por el ID del documento de compra proporcionado
                },
            });
            return notas;
        }catch(error){
            handlePrismaError(error)
        }
    }
}


export default new comprasRepository();