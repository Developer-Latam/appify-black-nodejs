import itemProdServOrdenCompraRepository from "../../persistence/repositorys/operaciones/itemProdServOrdenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class itemProdServOrdenCompraService {
    async createitemProducto(data) {
        const id = idgenerate("orden-compra-producto");
        return  itemProdServOrdenCompraRepository.createitemProducto({ ...data, id: id });
    }

    async getProductoById(id) {
        return itemProdServOrdenCompraRepository.findItemProductoById(id);
    }

    async createitemServicio(data) {
        const id = idgenerate("orden-compra-servicio");
        return  itemProdServOrdenCompraRepository.createitemServicio({ ...data, id: id });
    }

    async getServicioById(id) {
        return itemProdServOrdenCompraRepository.findItemServicioById(id);
    }

    async getProdServByOrdenCompraId(userId) {
        return itemProdServOrdenCompraRepository.findAllProdServByOrdenCompraId(userId);
    }

    async updateItemProducto(id, updateData) {
        return itemProdServOrdenCompraRepository.updateItemProducto(id, updateData);
    }

    async deleteItemProducto(id) {
        return itemProdServOrdenCompraRepository.deleteItemProducto(id);
    }

    async updateItemServicios(id, updateData) {
        return itemProdServOrdenCompraRepository.updateItemServicios(id, updateData);
    }

    async deleteItemServicios(id) {
        return itemProdServOrdenCompraRepository.deleteItemServicios(id);
    }
}
export default new itemProdServOrdenCompraService();