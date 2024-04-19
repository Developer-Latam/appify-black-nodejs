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
    createFC (idFC,idDC,{ idProvedoor,numero_documento, fecha, condicion_de_pago, cuenta, notas}){
        try {
            return prisma.factura_compra.create({
                data: {
                    id: idFC,
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
    async getFCEidByIdDoc(idDoc){
        try {
            const facturaCompraExenta = await prisma.factura_compra_excenta.findFirst({
                where: {
                    idDoc: idDoc
                },
                select: {
                    id: true 
                }
            });
            return facturaCompraExenta ? facturaCompraExenta.id : null;
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
    createNotaFC(idFC, idNCoD) {
        try {
            return prisma.nota_factura_compra.create({
                data: {
                    idFacturaVenta: idFC,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaFCE(idFCE, idNCoD) {
        try {
            return prisma.nota_factura_compra_excenta.create({
                data: {
                    //NUMERO DE LA FACTURA DE COMPRA EXCENTA
                    idFacturaCompraExcenta: idFCE,
                    idNotadeCD: idNCoD,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNotaNC({numero_documento, idNotadeCD}) {
        try {
            return prisma.nota_credito_nota_NC_compra.create({
                data: {
                    //id de la nota de credito a anular
                    idNotadeCD,
                    //numero que viene del sii
                    numero_documento,
                }
            })
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createNCoD_Compras (idNCoD,{idDoc,idProveedor,idVendedor,tipo_credito, tipo_debito, numero_documento,fecha,motivo_referencia,centro_de_beneficio, observacion, nota_interna, anula_doc, corrige_monto}){
        try {
            return prisma.notas_de_credito_debito_compras.create({
                data: {
                    id: idNCoD,
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
    createFCE (idFCE,idDC,{idCliente, tipo_documento, numero_documento,fecha, idVendedor, condicion_de_pago, centro_beneficio, observacion, nota_interna}){
        try {
            return prisma.factura_compra_excenta.create({
                data: {
                    id: idFCE,
                    idDoc: idDC,
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
            handlePrismaError(error)
        }
    }
    createItemServicioFCE (idFCE,itemsServicioFCE){
        try {
            const op = itemsServicioFCE.map(item => prisma.item_servicio_factura_compra_excenta.create({
                data: {
                    idServicio: item.idServicio,
                    idFactura: idFCE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return op
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemProductoFCE (idFCE,itemsProductoFCE){
        try {
            const operations = itemsProductoFCE.map(item => prisma.item_producto_factura_compra_excenta.create({
                data: {
                    idProducto: item.idProducto,
                    idFactura: idFCE,
                    codigo: item.codigo,
                    cantidad: item.cantidad,
                    unitario: item.unitario,
                    neto: item.neto,
                    cuenta: item.cuenta,
                    bonificacion: item.bonificacion,
                    notas: item.notas,
                }
            }));
            return operations
        } catch (error) {
            handlePrismaError(error)
        }
    }
    createItemServicioForNCoD (idNCoD,itemsServicioNCoD){
        try {
            const op = itemsServicioNCoD.map(item => prisma.item_servicio_nota_credito_compra.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCredito: idNCoD,
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
            handlePrismaError(error)
        }
    }
    createItemProductoForNCoD (idNCoD,itemsProductoNCoD){
        try {
            const operations = itemsProductoNCoD.map(item => prisma.item_producto_nota_credito_compra.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCredito: idNCoD,
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
            handlePrismaError(error)
        }
    }
    createItemServicioForNCoD_NCOD (idNCoD,itemsServicioNCoD_NC){
        try {
            const op = itemsServicioNCoD_NC.map(item => prisma.item_servicio_nota_credito_NC_compra.create({
                data: {
                    idServicio: item.idServicio,
                    idNotaCredito: idNCoD,
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
            handlePrismaError(error)
        }
    }
    createItemProductoForNCoD_NCOD (idNCoD,itemsProductoNCoD_NC){
        try {
            const operations = itemsProductoNCoD_NC.map(item => prisma.item_producto_nota_credito_NC_compra.create({
                data: {
                    idProducto: item.idProducto,
                    idNotaCredito: idNCoD,
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
            handlePrismaError(error)
        }
    }
}


export default new comprasRepository();