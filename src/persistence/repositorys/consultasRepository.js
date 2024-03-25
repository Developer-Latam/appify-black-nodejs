import { prisma } from "../../utils/dependencys/injection.js";

class ConsultasRepository{
    async createConsulta(data) {
        return prisma.consultas.create({
            data: data
        });
    }


    async findAllConsultasByUserId(userId) {
        return prisma.consultas.findMany({
            where: { idVendedor: userId }
        });
    }

    async updateConsulta(id, updateData) {
        return prisma.consultas.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteConsulta(id) {
        return prisma.consultas.delete({
            where: { id: id }
        });
    }
}

export default new ConsultasRepository();