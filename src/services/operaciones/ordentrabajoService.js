import ordenTrabajoRepository from "../../persistence/repositorys/operaciones/ordentrabajoRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ordenTrabajoService {
    async createOrdenTrabajo(data) {
        try {
            const id = idgenerate("orden-trabajo");
            return  ordenTrabajoRepository.createOrdenTrabajo({ ...data, id: id });
        } catch (error) {
            throw error;
        }
    }
    async getOrdenTrabajoById(id) {
        try {
            return ordenTrabajoRepository.findOrdenTrabajoById(id);
        } catch (error) {
            throw error;
        }
    }
    async getOrdenTrabajoByUserId(userId) {
        try {
            return ordenTrabajoRepository.findAllOrdenTrabajoByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
    async updateOrdenTrabajo(id, updateData) {
        try {
            return ordenTrabajoRepository.updateOrdenTrabajo(id, updateData);
        } catch (error) {
            throw error;
        }
    }
    async deleteOrdenTrabajo(id) {
        try {
            return ordenTrabajoRepository.deleteOrdenTrabajo(id);
        } catch (error) {
            throw error;
        }
    }
}
export default new ordenTrabajoService();