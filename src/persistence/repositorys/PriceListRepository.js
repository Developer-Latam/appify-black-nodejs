
import { connectionDB } from "../db/connection.js";

class PriceListRepository {
    async findAllByUserId(userId) {
        try {
            const [lists] = await connectionDB.execute('SELECT * FROM listas_de_precio WHERE user = ?', [userId]);
            return lists;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findByIdAndUserId(id, userId) {
        try {
            const [list] = await connectionDB.execute('SELECT * FROM listas_de_precio WHERE id = ? AND user = ?', [id, userId]);
            return list.length ? list[0] : null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createPriceList({ id, user, nombre, iva }) {
        try {
            await connectionDB.execute('INSERT INTO listas_de_precio (id, user, nombre, iva) VALUES (?, ?, ?, ?)', [id, user, nombre, iva]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePriceList(id, { nombre, iva }) {
        try {
            await connectionDB.execute('UPDATE listas_de_precio SET nombre = ?, iva = ? WHERE id = ?', [nombre, iva, id]);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deletePriceList(id) {
        try {
            await connectionDB.execute('DELETE FROM listas_de_precio WHERE id = ?', [id]);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addProductsToList(idLista, productos) {
        try {
            const insertValues = productos.map(producto => [idLista, producto.id_producto, producto.precio]);
            await connectionDB.query('INSERT INTO productos_lista_de_precios (id_lista, id_producto, precio) VALUES ?', [insertValues]);
            } catch (error) {
                throw new Error(error.message);
            }
        }
}

export default new PriceListRepository();

