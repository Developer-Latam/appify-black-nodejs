import ordenCompraRepository from "../../persistence/repositorys/operaciones/ordenCompraRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ordenCompraService {
    async createOrdenCompra(data) {
        try {
            const id = idgenerate("orden-compra");
            return  ordenCompraRepository.createOrdenCompra({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraById(id) {
        try {
            return ordenCompraRepository.findOrdenCompraById(id);
        } catch (error) {
            throw error;
        }
    }
    async getOrdenCompraByUserId(userId) {
        try {
            return ordenCompraRepository.findAllOrdenCompraByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async updateOrdenCompra(id, updateData) {
        try {
            return ordenCompraRepository.updateOrdenCompra(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteOrdenCompra(id) {
        try {
            return ordenCompraRepository.deleteOrdenCompra(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ordenCompraService();