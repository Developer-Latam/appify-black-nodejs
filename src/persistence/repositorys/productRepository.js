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
    async productExistsByName(nameProduct) {
        // const [response] = await connectionDB.execute('SELECT * FROM proveedores WHERE rut = ?', [rutProveedor]);
        const nombre = await prisma.productos.findFirst({
            where: {
                nombre : nameProduct,
            },
        })
        return nombre !== null;
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