import { prisma } from "../../../utils/dependencys/injection.js";


class itemProdServOrdenCompraRepository {
    async createitemProducto(data) {
        return prisma.item_producto.create({
            data: data
        });
    }

    async findItemProductoById(id) {
        return prisma.item_producto.findUnique({
            where: { id: id }
        });
    }

    async createitemServicio(data) {
        return prisma.item_servicios.create({
            data: data
        });
    }

    async findItemServicioById(id) {
        return prisma.item_servicios.findUnique({
            where: { id: id }
        });
    }

    async findAllProdServByOrdenCompraId(idOrden) {
        const resultado = []; 

  try {
    const ordencompra = await prisma.orden_compra.findUnique({
      where: {
        id : idOrden, // Filtrar proyectos por el ID de orden de compra
      },
    });

    

    if (ordencompra) {
      const productos = await prisma.item_producto.findMany({
        where: {
          idOrdenCompra: ordencompra.id,
        },
    
        
      });

      const servicios = await prisma.item_servicios.findMany({
        where: {
          idOrdenCompra: ordencompra.id,
        },
    
        
      });

      // Creamos un objeto que contenga la información del Producto y servicios de orden de
      const ProdServtot = {
        productos,
        servicios
      };

      // Agregamos el objeto al resultado
      resultado.push(ProdServtot);
    }else{
        return { error: 'No se encontró la orden de compra con el ID proporcionado' };
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


    async updateItemProducto(id, updateData) {
        return prisma.item_producto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteItemProducto(id) {
        return prisma.item_producto.delete({
            where: { id: id }
        });
    }

    async updateItemServicios(id, updateData) {
        return prisma.item_servicios.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteItemServicios(id) {
        return prisma.item_servicios.delete({
            where: { id: id }
        });
    }
}

export default new itemProdServOrdenCompraRepository();