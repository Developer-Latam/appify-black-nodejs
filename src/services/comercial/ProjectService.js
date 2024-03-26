<<<<<<< HEAD
import ProjectRepository from "../../persistence/repositorys/comercial/ProjectRepository.js";
=======
import ProjectRepository from "../persistence/repositorys/ProjectRepository.js";
<<<<<<< HEAD:src/services/ProjectService.js
import userRepository from "../persistence/repositorys/userRepository.js";
import { idgenerate } from "../utils/id/idGenerate.js";
=======
>>>>>>> 51e4ceb4b521b574a66ca7e767202be822895d59
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

>>>>>>> 077621c63f49679a2c8a8adfff5f1e02857ad118:src/services/comercial/ProjectService.js

class ProjectService {
    async createProject(data) {
        const id = idgenerate("project");
        //Verificar si existe el proyecto y el usuario para la empresa
        const superUserExist = await userRepository.userExistsById(data.user);
        const proyectoExist = await ProjectRepository.projectExistsByName(data.nombre_etiqueta);
        if(proyectoExist && superUserExist){
            return { ok: false, message: 'Proyecto ya existente en la empresa' };
        }
        return ProjectRepository.createProject({ ...data, id: id });
    }

    async getProjectById(id) {
        return ProjectRepository.findProjectById(id);
    }

    async getProjectsByUserId(userId) {
        return ProjectRepository.findAllProjectsByUserId(userId);
    }

    async updateProject(id, updateData) {
        return ProjectRepository.updateProject(id, updateData);
    }

    async deleteProject(id) {
        return ProjectRepository.deleteProject(id);
    }
}
export default new ProjectService();