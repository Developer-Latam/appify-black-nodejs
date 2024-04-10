import TransportistaRepository from "../../persistence/repositorys/administracion/transportistaRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";


class TransportistaService {
    async createTransportista(data) {
        const id = idgenerate("transportista");
        
        return  TransportistaRepository.createTransportista({ ...data, id: id });
    }

    async getTransportistaById(id) {
        return TransportistaRepository.findTransportistaById(id);
    }

    async getTransportistaByUserId(userId) {
        return TransportistaRepository.findAllTransportistasByUserId(userId);
    }

    async updateTransportista(id, updateData) {
        return TransportistaRepository.updateTransportista(id, updateData);
    }

    async deleteTransportista(id) {
        return TransportistaRepository.deleteTransportista(id);
    }
}
export default new TransportistaService();