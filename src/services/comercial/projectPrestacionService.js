import ProjectPrestacionRepository from "../../persistence/repositorys/comercial/projectPrestacionRepository.js";

class ProjectPrestacionService {
    async createProjectPrestacion(data) {

        return ProjectPrestacionRepository.createProjectPrestacion({ ...data });
    }

    async getProjectPrestacionById(id) {

        return ProjectPrestacionRepository.findProjectPrestacionById(id);
    }

    

    async updateProjectPrestacion(id, updateData) {

        return ProjectPrestacionRepository.updateProjectPrestacion(id, updateData);
    }

    async deleteProjectPrestacion(id) {

        return ProjectPrestacionRepository.deleteProjectPrestacion(id);
    }
}
export default new ProjectPrestacionService();