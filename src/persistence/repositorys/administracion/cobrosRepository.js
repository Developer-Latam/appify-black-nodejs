import { prisma } from "../../../utils/dependencys/injection.js";

class cobrosRepository {


    async createCobros(data) {
        return prisma.cobros.create({
            data: data
        });
    }

    async createCobrosFV(data) {
        return prisma.cobros_factura_venta.create({
            data : data
        });
    }

    async createCobrosFVE(data) {
        return prisma.cobros_factura_venta_excenta.create({
            data : data
        });
    }

    async createCobrosNC(data) {
        return prisma.cobros_factura_nota_credito.create({
            data : data
        });
    }

    async findCobroById(id) {
        return prisma.cobros.findUnique({
            where: { id: id }
        });
    }

    async findCobroFVByCobroId(id) {
        return prisma.cobros_factura_venta.findUnique({
            where: { idCobro: id }
        });
    }

    async findCobroFVEByCobroId(id) {
        return prisma.cobros_factura_venta_excenta.findUnique({
            where: { idCobro: id }
        });
    }

    async findCobroNCByCobroId(id) {
        return prisma.cobros_factura_nota_credito.findUnique({
            where: { idCobro: id }
        });
    }

    async findAllCobrosByUserId(userId) {
        return prisma.cobros.findMany({
            where: { user: userId }
        });
    }


    async updateCobro(id, updateData) {
        return prisma.cobros.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateCobroFV(id, updateData) {
        return prisma.cobros_factura_venta.update({
            where: { idCobro: id },
            data: updateData
        });
    }
    async updateCobroFVE(id, updateData) {
        return prisma.cobros_factura_venta_excenta.update({
            where: { idCobro: id },
            data: updateData
        });
    }

    async updateCobroNC(id, updateData) {
        return prisma.cobros_factura_nota_credito.update({
            where: { idCobro: id },
            data: updateData
        });
    }


    async deleteCobro(id) {
        return prisma.cobros.delete({
            where: { id: id }
        });
    }

    async deleteCobroFVByCobroId(id) {
        return prisma.cobros_factura_venta.delete({
            where: { idCobro: id }
        });
    }

    async deleteCobroFVEByCobroId(id) {
        return prisma.cobros_factura_venta_excenta.delete({
            where: { idCobro: id }
        });
    }

    async deleteCobroNCByCobroId(id) {
        return prisma.cobros_factura_nota_credito.delete({
            where: { idCobro: id }
        });
    }

}


export default new cobrosRepository()