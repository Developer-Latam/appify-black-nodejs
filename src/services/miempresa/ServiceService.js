import ServiceRepository from "../../persistence/repositorys/miempresa/serviceRepository.js";
import userRepository from "../../persistence/repositorys/miempresa/userRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";
class ServiceService {
    async createService(data) {
        const id = idgenerate("service");
        const superUserExist = await userRepository.userExistsById(data.user);
        const serviceExist = await ServiceRepository.serviceExistsByName(data.nombre);
        if(serviceExist && superUserExist){
            return { ok: false, message: 'Servicio ya existente en la empresa' };
        }
        
        return  ServiceRepository.createService({ ...data, id: id });
    }

    async getServiceById(id) {
        return ServiceRepository.findServiceById(id);
    }

    async getServiceByUserId(userId) {
        return ServiceRepository.findAllServiciosByUserId(userId);
    }

    async updateService(id, updateData) {
        return ServiceRepository.updateServicios(id, updateData);
    }

    async deleteService(id) {
        return ServiceRepository.deleteService(id);
    }
}
export default new ServiceService();