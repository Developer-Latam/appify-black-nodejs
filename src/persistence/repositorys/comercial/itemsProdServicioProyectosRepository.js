import { prisma } from "../../../utils/dependencys/injection.js";

class itemsProdServProyectosRepository{
    async createProductItem(data) {
        return prisma.item_producto_proyecto.create({
            data: data
        });
    }

    async findProductByIdProyecto(id) {
        return prisma.item_producto_proyecto.findUnique({
            where: { id: id }
        });
    }

    async findAllProductosByProyectId(proyectId) {
        return prisma.item_producto_proyecto.findMany({
            where: { idProyecto: proyectId }
        });
    }

    async updateProductItem(id, updateData) {
        return prisma.item_producto_proyecto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteProductItem(id) {
        return prisma.item_producto_proyecto.delete({
            where: { id: id }
        });
    }
    async createServiceItem(data) {
        return prisma.item_servicio_proyecto.create({
            data: data
        });
    }

    async findProductById(id) {
        return prisma.item_servicio_proyecto.findUnique({
            where: { id: id }
        });
    }

    async findAllServiciosByServiceId(serviceId) {
        return prisma.item_servicio_proyecto.findMany({
            where: { idProyecto: serviceId }
        });
    }

    async updateServiceItem(id, updateData) {
        return prisma.item_servicio_proyecto.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteServiceItem(id) {
        return prisma.item_servicio_proyecto.delete({
            where: { id: id }
        });
    }
}

export default new itemsProdServProyectosRepository();