import { prisma } from "../../../utils/dependencys/injection.js";

class ProjectAgendamientoRepository{
    async createProjectAgendamiento(data) {
        return prisma.agendamiento_proyecto.create({
            data: data
        });
    }

    

    async findProjectAgendamientoById(id) {
        return prisma.agendamiento_proyecto.findUnique({
            where: { id: id }
        });
    }


    async updateProjectAgendamiento(id, updateData) {
        return prisma.agendamiento_proyecto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteProjectAgendamiento(id) {
        return prisma.agendamiento_proyecto.delete({
            where: { id: id }
        });
    }
}

export default new ProjectAgendamientoRepository();