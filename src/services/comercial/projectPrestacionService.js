import ProjectPrestacionRepository from "../../persistence/repositorys/comercial/projectPrestacionRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class ProjectPrestacionService {
    async createProjectPrestacion(data) {

        const id = idgenerate('Direccion-prestacion')

        return ProjectPrestacionRepository.createProjectPrestacion({ ...data, id :id});
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