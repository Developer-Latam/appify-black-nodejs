import { prisma } from "../../../utils/dependencys/injection.js";

class costosCProyectoRepository{
    async createCosto(data) {
        return prisma.costos_por_proyecto.create({
            data: data
        });
    }


    async findAllCostosByProyectoId(id) {
        return prisma.costos_por_proyecto.findMany({
            where: { proyecto : id }
        });
    }

    async updateCosto(id, updateData) {
        return prisma.costos_por_proyecto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteCosto(id) {
        return prisma.costos_por_proyecto.delete({
            where: { id: id }
        });
    }
}

export default new costosCProyectoRepository();