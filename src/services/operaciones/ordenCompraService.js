import ordenCompraRepository from "../../persistence/repositorys/operaciones/ordenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ordenCompraService {
    async createOrdenCompra(data) {
        const id = idgenerate("orden-compra");
        return  ordenCompraRepository.createOrdenCompra({ ...data, id: id });
    }

    async getOrdenCompraById(id) {
        return ordenCompraRepository.findOrdenCompraById(id);
    }

    async getOrdenCompraByUserId(userId) {
        return ordenCompraRepository.findAllOrdenCompraByUserId(userId);
    }

    async updateOrdenCompra(id, updateData) {
        return ordenCompraRepository.updateOrdenCompra(id, updateData);
    }

    async deleteOrdenCompra(id) {
        return ordenCompraRepository.deleteOrdenCompra(id);
    }
}
export default new ordenCompraService();