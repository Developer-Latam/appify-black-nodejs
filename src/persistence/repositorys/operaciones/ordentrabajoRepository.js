import { prisma } from "../../../utils/dependencys/injection.js";


class ordenTrabajoRepository {
    async createOrdenTrabajo(data) {
        return prisma.orden_trabajo.create({
            data: data
        });
    }

    async findOrdenTrabajoById(id) {
        return prisma.orden_trabajo.findUnique({
            where: { id: id }
        });
    }

    async findAllOrdenTrabajoByUserId(idUser) {
        const resultado = []; // Inicializamos un arreglo para almacenar los resultados

  try {
    const proyectos = await prisma.proyectos.findMany({
      where: {
        user: idUser, // Filtrar proyectos por el ID de usuario
      },
    });

    for (const proyecto of proyectos) {
      const ordenesDeTrabajo = await prisma.orden_trabajo.findMany({
        where: {
          idProyecto: proyecto.id,
        },
      });

      // Creamos un objeto que contenga la información del proyecto y sus órdenes de trabajo
      const OrdenesDeTrabajo = {
        ordenesDeTrabajo
      };

      // Agregamos el objeto al resultado
      resultado.push(OrdenesDeTrabajo);
    }
  } catch (error) {
    console.error('Error al obtener los proyectos y sus ordenes de trabajo:', error);
    return { error: 'Error al obtener los proyectos y sus ordenes de trabajo' }; // Manejo de error
  } finally {
    await prisma.$disconnect();
  }

  // Retornamos el resultado como un objeto JSON
  return resultado;
}


    async updateOrdenTrabajo(id, updateData) {
        return prisma.orden_trabajo.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteOrdenTrabajo(id) {
        return prisma.orden_trabajo.delete({
            where: { id: id }
        });
    }
}

export default new ordenTrabajoRepository();