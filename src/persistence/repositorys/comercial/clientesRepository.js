import { prisma } from "../../../utils/dependencys/injection.js";
class ClientesRepository {
    async createCliente(data) {
        return prisma.clientes.create({
            data: data
        });
    }

    async findClienteById(id) {
        return prisma.clientes.findUnique({
            where: { id: id }
        });
    }
    async findClienteById_razonsocial(id) {
        const cliente = await prisma.clientes.findUnique({
            where: { id: id },
            select: {
                razon_social: true
            }
        });
        return cliente ? cliente.razon_social : null; 
    }
    // Funcion para checkear que no exista el mismo servicio
    async clienteExistsByName(nameCliente) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const nombre = await prisma.clientes.findFirst({
            where: {
                razon_social : nameCliente,
            },
        })
        return nombre !== null;
    }

    async findAllClientesByUserId(userId) {
        return prisma.clientes.findMany({
            where: { user: userId }
        });
    }

    async updateCliente(id, updateData) {
        return prisma.clientes.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteCliente(id) {
        return prisma.clientes.delete({
            where: { id: id }
        });
    }
}

export default new ClientesRepository();