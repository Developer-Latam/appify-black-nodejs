import { prisma } from "../../utils/dependencys/injection.js";
class ServiceRepository {
    async createService(data) {
        return prisma.servicios.create({
            data: data
        });
    }

    async findServiceById(id) {
        return prisma.servicios.findUnique({
            where: { id: id }
        });
    }
    // Funcion para checkear que no exista el mismo servicio
    async serviceExistsByName(nameService) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const nombre = await prisma.servicios.findFirst({
            where: {
                nombre : nameService,
            },
        })
        return nombre !== null;
    }

    async findAllServiciosByUserId(userId) {
        return prisma.servicios.findMany({
            where: { user: userId }
        });
    }

    async updateServicios(id, updateData) {
        return prisma.servicios.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteService(id) {
        return prisma.servicios.delete({
            where: { id: id }
        });
    }
}

export default new ServiceRepository();