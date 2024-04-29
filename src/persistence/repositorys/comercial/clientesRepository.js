import { prisma } from "../../../utils/dependencys/injection.js";
import handlePrismaError from "../../../utils/httpRes/handlePrismaError.js"
class ClientesRepository {
    async createCliente(data) {
        try {
            return prisma.clientes.create({
                data: data
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findClienteById(id) {
        try {
            return prisma.clientes.findUnique({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findClienteById_razonsocial(id) {
        try {
            const cliente = await prisma.clientes.findUnique({
                where: { id: id },
                select: {
                    razon_social: true
                }
            });
            return cliente ? cliente.razon_social : null; 
        } catch (error) {
            handlePrismaError(error);
        }
    }
    // Funcion para checkear que no exista el mismo servicio
    async clienteExistsByName(nameCliente) {
        try {
            const nombre = await prisma.clientes.findFirst({
                where: {
                    razon_social : nameCliente,
                },
            })
            return nombre !== null;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async findAllClientesByUserId(userId) {
        try {
            return prisma.clientes.findMany({
                where: { user: userId }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async updateCliente(id, updateData) {
        try {
            return prisma.clientes.update({
                where: { id: id },
                data: updateData
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
    async deleteCliente(id) {
        try {
            return prisma.clientes.delete({
                where: { id: id }
            });
        } catch (error) {
            handlePrismaError(error);
        }
    }
}
export default new ClientesRepository();