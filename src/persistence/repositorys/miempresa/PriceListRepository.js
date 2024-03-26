
import { connectionDB } from "../../db/connection.js";
import { prisma } from "../../../utils/dependencys/injection.js"
class PriceListRepository {
    async findAllByUserId(userId) {
        try {
            //await connectionDB.execute('SELECT * FROM listas_de_precio WHERE user = ?', [userId]);
            const listas = await prisma.listas_de_precio.findMany({
                where: {
                    user: userId,
                },
            })
            return listas;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async findByIdAndUserId(id, userId) {
        try {
            //await connectionDB.execute('SELECT * FROM listas_de_precio WHERE id = ? AND user = ?', [id, userId]);
            const lista = await prisma.listas_de_precio.findFirst({
                where: {
                    AND: [
                        { id: id},
                        { user: userId }
                    ],
                },
            })
            return lista
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createPriceList({ id, user, nombre, iva }) {
        try {
            // await connectionDB.execute('INSERT INTO listas_de_precio (id, user, nombre, iva) VALUES (?, ?, ?, ?)', [id, user, nombre, iva]);
            const priceList = await prisma.listas_de_precio.create({
                data: {
                    id,
                    user,
                    nombre,
                    iva
                }
            })
            return priceList
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePriceList(id, { nombre, iva }) {
        try {
            //await connectionDB.execute('UPDATE listas_de_precio SET nombre = ?, iva = ? WHERE id = ?', [nombre, iva, id]);
            await prisma.listas_de_precio.update({
                where: {
                    id
                },
                data: {
                    nombre,
                    iva
                }
            })
            return("Precio de productos actualizado")
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deletePriceList(id) {
        try {
            //await connectionDB.execute('DELETE FROM listas_de_precio WHERE id = ?', [id]);
            await prisma.listas_de_precio.delete({
                where: {
                    id
                }
            })
            return("Producto eliminado de la lista exitosamente")
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new PriceListRepository();

