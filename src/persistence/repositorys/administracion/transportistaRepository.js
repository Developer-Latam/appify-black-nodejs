import { prisma } from "../../../utils/dependencys/injection.js";


class TransportistaRepository {
    async createTransportista(data) {
        return prisma.transportista.create({
            data: data
        });
    }

    async findTransportistaById(id) {
        return prisma.transportista.findUnique({
            where: { id: id }
        });
    }

    async findAllTransportistasByUserId(userId) {
        return prisma.transportista.findMany({
            where: { user: userId }
        });
    }

    async updateTransportista(id, updateData) {
        return prisma.transportista.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteTransportista(id) {
        return prisma.transportista.delete({
            where: { id: id }
        });
    }
}

export default new TransportistaRepository();