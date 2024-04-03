import itemsProdServicioProyectosRepository from "../../persistence/repositorys/comercial/itemsProdServicioProyectosRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class itemsProdServProjectService {
    async createItemProductProject(data) {
        const id = idgenerate("item-product-project");
        return itemsProdServicioProyectosRepository.createProductItem({ ...data, id: id });
    }

    async getProductItemById(id) {
        return itemsProdServicioProyectosRepository.findProductByIdProyecto(id);
    }

    async getProductsItemByprojectId(proyectId) {
        return itemsProdServicioProyectosRepository.findAllProductosByProyectId(proyectId);
    }

    async updateProductItem(id, updateData) {
        return itemsProdServicioProyectosRepository.updateProductItem(id, updateData);
    }

    async deleteProductItem(id) {
        return itemsProdServicioProyectosRepository.deleteProductItem(id);
    }
    async createServiceItem(data) {
        const id = idgenerate("item-service-project");
        return itemsProdServicioProyectosRepository.createServiceItem({ ...data, id: id });
    }

    async getServiceItemById(id) {
        return itemsProdServicioProyectosRepository.findServiceById(id);
    }

    async getServiceItemByProjectId(proyectId) {
        return itemsProdServicioProyectosRepository.findAllServiciosByServiceId(proyectId);
    }

    async updateServiceItem(id, updateData) {
        return itemsProdServicioProyectosRepository.updateServiceItem(id, updateData);
    }

    async deleteServiceItem(id) {
        return itemsProdServicioProyectosRepository.deleteServiceItem(id);
    }
}
export default new itemsProdServProjectService();