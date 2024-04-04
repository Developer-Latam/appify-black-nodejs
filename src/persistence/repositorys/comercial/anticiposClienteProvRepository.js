import { prisma } from "../../../utils/dependencys/injection.js";

class anticiposClienteProvRepository{
    async createAnticipoCliente(data) {
        return prisma.anticipos_cliente.create({
            data: data
        });
    }


    async findAllAnticiposCienteByProyectoId(id) {
        return prisma.anticipos_cliente.findMany({
            where: { idProyecto : id }
        });
    }

    async updateAnticipoCliente(id, updateData) {
        return prisma.anticipos_cliente.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteAnticipoCliente(id) {
        return prisma.anticipos_cliente.delete({
            where: { id: id }
        });
    }

    async createAnticipoProveedor(data) {
        return prisma.anticipos_proveedor.create({
            data: data
        });
    }


    async findAllAnticiposProveedorByProyectoId(id) {
        return prisma.anticipos_proveedor.findMany({
            where: { idProyecto : id }
        });
    }

    async updateAnticipoProveedor(id, updateData) {
        return prisma.anticipos_proveedor.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteAnticipoProveedor(id) {
        return prisma.anticipos_proveedor.delete({
            where: { id: id }
        });
    }
}

export default new anticiposClienteProvRepository();