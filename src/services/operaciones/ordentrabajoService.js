import ordenTrabajoRepository from "../../persistence/repositorys/operaciones/ordentrabajoRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ordenTrabajoService {
    async createOrdenTrabajo(data) {
        const id = idgenerate("orden-trabajo");
        return  ordenTrabajoRepository.createOrdenTrabajo({ ...data, id: id });
    }

    async getOrdenTrabajoById(id) {
        return ordenTrabajoRepository.findOrdenTrabajoById(id);
    }

    async getOrdenTrabajoByUserId(userId) {
        return ordenTrabajoRepository.findAllOrdenTrabajoByUserId(userId);
    }

    async updateOrdenTrabajo(id, updateData) {
        return ordenTrabajoRepository.updateOrdenTrabajo(id, updateData);
    }

    async deleteOrdenTrabajo(id) {
        return ordenTrabajoRepository.deleteOrdenTrabajo(id);
    }
}
export default new ordenTrabajoService();