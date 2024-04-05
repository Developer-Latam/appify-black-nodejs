import { prisma } from "../../../utils/dependencys/injection.js";


class ordenCompraRepository {
    async createOrdenCompra(data) {
        return prisma.orden_compra.create({
            data: data
        });
    }

    async findOrdenCompraById(id) {
        return prisma.orden_compra.findUnique({
            where: { id: id }
        });
    }

    async findAllOrdenCompraByUserId(idUser) {
        const resultado = []; // Inicializamos un arreglo para almacenar los resultados

  try {
    const proveedores = await prisma.proveedores.findMany({
      where: {
        user: idUser, // Filtrar proyectos por el ID de usuario
      },
    });

    for (const proveedor of proveedores) {
      const Proveedores = await prisma.orden_compra.findMany({
        where: {
          idProvedor: proveedor.id,
        },
      });

      // Creamos un objeto que contenga la información del proyecto y sus órdenes de trabajo
      const proovedtot = {
        Proveedores
      };

      // Agregamos el objeto al resultado
      resultado.push(proovedtot);
    }
  } catch (error) {
    console.error('Error al obtener los proveedores y sus ordenes de compra:', error);
    return { error: 'Error al obtener los proveedores y sus ordenes de compra' }; // Manejo de error
  } finally {
    await prisma.$disconnect();
  }

  // Retornamos el resultado como un objeto JSON
  return resultado;
}


    async updateOrdenCompra(id, updateData) {
        return prisma.orden_compra.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteOrdenCompra(id) {
        return prisma.orden_compra.delete({
            where: { id: id }
        });
    }
}

export default new ordenCompraRepository();