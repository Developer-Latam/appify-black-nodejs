import ProjectRepository from "../../persistence/repositorys/comercial/ProjectRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
import projectPrestacionService from "../../services/comercial/projectPrestacionService.js";
import projectAgendamientoService from "../../services/comercial/projectAgendamientoService.js";
import itemsProdServProjectService from "../../services/comercial/itemsProdServProyectosService.js";


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


    async createProjectAll(data) {
        const {
            proyectos,
            direccion_de_prestacion_proyecto,
            agendamiento_proyecto,
            item_servicio_proyecto,
            item_producto_proyecto
        } = data;
    
        const proyecto = await this.createProject(proyectos);
        let direccion, agendamiento, servicios = [], productos = [];
    
        if (direccion_de_prestacion_proyecto) {
            direccion = await projectPrestacionService.createProjectPrestacion({...direccion_de_prestacion_proyecto, proyecto: proyecto.id});
        }
    
        if (agendamiento_proyecto) {
            agendamiento = await projectAgendamientoService.createProjectAgendamiento({...agendamiento_proyecto, proyecto: proyecto.id});
        }
    
        if (Array.isArray(item_servicio_proyecto)) {
            for (const item of item_servicio_proyecto) {
                servicios.push(await itemsProdServProjectService.createServiceItem({...item, idProyecto: proyecto.id}));
            }
        } else if (item_servicio_proyecto) {
            servicios.push(await itemsProdServProjectService.createServiceItem({...item_servicio_proyecto, idProyecto: proyecto.id}));
        }
    
        if (Array.isArray(item_producto_proyecto)) {
            for (const item of item_producto_proyecto) {
                productos.push(await itemsProdServProjectService.createItemProductProject({...item, idProyecto: proyecto.id}));
            }
        } else if (item_producto_proyecto) {
            productos.push(await itemsProdServProjectService.createItemProductProject({...item_producto_proyecto, idProyecto: proyecto.id}));
        }
    
        return {
            proyecto,
            direccion,
            agendamiento,
            servicios,
            productos
        };
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