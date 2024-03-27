import ProjectPrestacionRepository from "../../persistence/repositorys/comercial/projectAgendamientoRepository.js";

class ProjectAgendamientoService {
    async createProjectAgendamiento(data) {

        return ProjectPrestacionRepository.createProjectAgendamiento({ ...data });
    }

    async getProjectAgendamientoById(id) {

        return ProjectPrestacionRepository.findProjectAgendamientoById(id);
    }

    

    async updateProjectAgendamiento(id, updateData) {

        return ProjectPrestacionRepository.updateProjectAgendamiento(id, updateData);
    }

    async deleteProjectAgendamiento(id) {

        return ProjectPrestacionRepository.deleteProjectAgendamiento(id);
    }
}
export default new ProjectAgendamientoService();