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
        return prisma.cobros_factura_venta.findFirst({
            where: { idCobro: id }
        });
    }

    async findCobroFVEByCobroId(id) {
        return prisma.cobros_factura_venta_excenta.findFirst({
            where: { idCobro: id }
        });
    }
    async findNCById(id){
        return prisma.notas_de_credito_debito.findUnique({
            where : { id : id }
        })
    }

    async findFVById(id){
        return prisma.factura_venta.findUnique({
            where : { id : id }
        })
    }

    async findFVEById(id){
        return prisma.factura_venta_excenta.findUnique({
            where : { id : id }
        })
    }

    async findCobroNCByCobroId(id) {
        return prisma.cobros_factura_nota_credito.findFirst({
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
            where: { id: id },
            data: updateData
        });
    }
    async updateCobroFVE(id, updateData) {
        return prisma.cobros_factura_venta_excenta.update({
            where: { id: id },
            data: updateData
        });
    }

    async updateCobroNC(id, updateData) {
        return prisma.cobros_factura_nota_credito.update({
            where: { id: id },
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
            where: { id: id }
        });
    }

    async deleteCobroFVEByCobroId(id) {
        return prisma.cobros_factura_venta_excenta.delete({
            where: { id: id }
        });
    }

    async deleteCobroNCByCobroId(id) {
        return prisma.cobros_factura_nota_credito.delete({
            where: { id: id }
        });
    }

}


export default new cobrosRepository()