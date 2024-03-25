import { prisma } from "../../utils/dependencys/injection.js";

class ProjectRepository{
    async createProject(data) {
        return prisma.proyectos.create({
            data: data
        });
    }

    async projectExistsByName(nameProject) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const nombre = await prisma.proyectos.findFirst({
            where: {
                nombre_etiqueta : nameProject,
            },
        })
        return nombre !== null;
    }

    async findProjectById(id) {
        return prisma.proyectos.findUnique({
            where: { id: id }
        });
    }

    async findAllProjectsByUserId(userId) {
        return prisma.proyectos.findMany({
            where: { user: userId }
        });
    }

    async updateProject(id, updateData) {
        return prisma.proyectos.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteProject(id) {
        return prisma.proyectos.delete({
            where: { id: id }
        });
    }
}

export default new ProjectRepository();