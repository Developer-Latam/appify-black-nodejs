import { prisma } from "../../../utils/dependencys/injection.js";
class EcommerceRepository {
    async createEcommerce(data) {
        return prisma.e_commerce.create({
            data: data
        });
    }

    async findEcommerceById(id) {
        return prisma.e_commerce.findUnique({
            where: { id: id }
        });
    }
    // Funcion para checkear que no exista el mismo servicio
    async ecommerceExistsByName(nameEcommerce) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const nombre = await prisma.e_commerce.findFirst({
            where: {
                nombre : nameEcommerce,
            },
        })
        return nombre !== null;
    }

    async findAllEcommerceByUserId(userId) {
        return prisma.e_commerce.findMany({
            where: { user: userId }
        });
    }

    async findAllEcommerceByCategory(userId, category) {
        return prisma.e_commerce.findMany({
            where: { 
            user: userId,
            categoria: category
        }
        });
    }

    async updateEcommerce(id, updateData) {
        return prisma.e_commerce.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteEcommerce(id) {
        return prisma.e_commerce.delete({
            where: { id: id }
        });
    }
}

export default new EcommerceRepository();