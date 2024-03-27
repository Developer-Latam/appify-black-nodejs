import { prisma } from "../../../utils/dependencys/injection.js";

class ProjectPrestacionRepository{
    async createProjectPrestacion(data) {
        return prisma.direccion_de_prestacion_proyecto.create({
            data: data
        });
    }

    

    async findProjectPrestacionById(id) {
        return prisma.direccion_de_prestacion_proyecto.findUnique({
            where: { id: id }
        });
    }


    async updateProjectPrestacion(id, updateData) {
        return prisma.direccion_de_prestacion_proyecto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteProjectPrestacion(id) {
        return prisma.direccion_de_prestacion_proyecto.delete({
            where: { id: id }
        });
    }
}

export default new ProjectPrestacionRepository();