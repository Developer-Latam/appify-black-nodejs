import { prisma } from "../../../utils/dependencys/injection.js";

class pagosRepository {


    async createPagos(data) {
        return prisma.pagos.create({
            data: data
        });
    }

    async createPagosFC(data) {
        return prisma.pagos_factura_compra.create({
            data : data
        });
    }


    async createPagosNC(data) {
        return prisma.pagos_factura_nota_credito.create({
            data : data
        });
    }

    async findPagosById(id) {
        return prisma.pagos.findUnique({
            where: { id: id }
        });
    }

    async findPagosFCByCobroId(id) {
        return prisma.pagos_factura_compra.findFirst({
            where: { idPago: id }
        });
    }

    

    async findPagosNCByCobroId(id) {
        return prisma.pagos_factura_nota_credito.findFirst({
            where: { idCobro: id }
        });
    }

    async findAllPagosByUserId(userId) {
        return prisma.pagos.findMany({
            where: { user: userId }
        });
    }


    async updatePagos(id, updateData) {
        return prisma.pagos.update({
            where: { id: id },
            data: updateData
        });
    }

    async updatePagosFC(id, updateData) {
        return prisma.pagos_factura_compra.update({
            where: { id: id },
            data: updateData
        });
    }
    

    async updatePagosNC(id, updateData) {
        return prisma.pagos_factura_nota_credito.update({
            where: { id: id },
            data: updateData
        });
    }


    async deletePagos(id) {
        return prisma.pagos.delete({
            where: { id: id }
        });
    }

    async deletePagosFCByCobroId(id) {
        return prisma.pagos_factura_compra.delete({
            where: { id: id }
        });
    }


    async deletePagosNCByCobroId(id) {
        return prisma.pagos_factura_nota_credito.delete({
            where: { id: id }
        });
    }

}


export default new pagosRepository()