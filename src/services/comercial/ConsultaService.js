import ConsultasRepository from "../persistence/repositorys/comercial/consultasRepository.js";


class ConsultaService {
    async createConsulta(data) {
        
        return ConsultasRepository.createConsulta({ ...data });
    }

    async getConsultasByUserId(userId) {
        return ConsultasRepository.findAllConsultasByUserId(userId);
    }

    async updateConsulta(id, updateData) {
        return ConsultasRepository.updateConsulta(id, updateData);
    }

    async deleteConsulta(id) {
        return ConsultasRepository.deleteConsulta(id);
    }
}
export default new ConsultaService();