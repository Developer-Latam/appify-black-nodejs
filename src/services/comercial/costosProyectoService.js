import costosProyectoRepository from "../../persistence/repositorys/comercial/costosProyectoRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class costosProyectoService {
    async createCosto(data) {
        const id = idgenerate("costo-proyecto");
        return costosProyectoRepository.createCosto({ ...data, id: id });
    }

    async getCostosByProyectoId(proyectoId) {
        return costosProyectoRepository.findAllCostosByProyectoId(proyectoId);
    }

    async updateCosto(id, updateData) {
        return costosProyectoRepository.updateCosto(id, updateData);
    }

    async deleteCosto(id) {
        return costosProyectoRepository.deleteCosto(id);
    }

}
export default new costosProyectoService();