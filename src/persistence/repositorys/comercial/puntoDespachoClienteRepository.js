import { prisma } from "../../../utils/dependencys/injection.js";

class puntoDespachoClienteRepository{
    async createPuntoDespacho(data) {
        return prisma.puntos_de_despacho_por_cliente.create({
            data: data
        });
    }


    async findAllPuntosDespachoByClienteId(id) {
        return prisma.puntos_de_despacho_por_cliente.findMany({
            where: { cliente: id }
        });
    }

    async updatePuntoDespacho(id, updateData) {
        return prisma.puntos_de_despacho_por_cliente.update({
            where: { id: id },
            data: updateData
        });
    }

    async deletePuntoDespacho(id) {
        return prisma.puntos_de_despacho_por_cliente.delete({
            where: { id: id }
        });
    }
}

export default new puntoDespachoClienteRepository();