import { prisma } from "../../utils/dependencys/injection.js";
class ProductRepository {
    async createProduct(data) {
        return prisma.productos.create({
            data: data
        });
    }

    async findProductById(id) {
        return prisma.productos.findUnique({
            where: { id: id }
        });
    }

    async findAllProductsByUserId(userId) {
        return prisma.productos.findMany({
            where: { user: userId }
        });
    }

    async updateProduct(id, updateData) {
        return prisma.productos.update({
            where: { id: id },
            data: updateData
        });
    }

    async deleteProduct(id) {
        return prisma.productos.delete({
            where: { id: id }
        });
    }
}

export default new ProductRepository();