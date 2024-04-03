import { prisma } from "../../../utils/dependencys/injection.js";

class contactoClienteRepository{
    async createContacto(data) {
        return prisma.contactos_por_cliente.create({
            data: data
        });
    }


    async findAllContactosByClienteId(id) {
        return prisma.contactos_por_cliente.findMany({
            where: { cliente: id }
        });
    }

    async updateContacto(id, updateData) {
        return prisma.contactos_por_cliente.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteContacto(id) {
        return prisma.contactos_por_cliente.delete({
            where: { id: id }
        });
    }
}

export default new contactoClienteRepository();