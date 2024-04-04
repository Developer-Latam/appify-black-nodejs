import anticiposClienteProvRepository from "../../persistence/repositorys/comercial/anticiposClienteProvRepository.js";
import { idgenerate } from "../../utils/id/idGenerate.js";

class anticipoClientesProvService {
    async createAnticipoCliente(data) {
        const id = idgenerate("anticipo-cliente");
        return anticiposClienteProvRepository.createAnticipoCliente({ ...data, id: id });
    }

    async getAnticiposClienteByProyectoId(proyectoId) {
        return anticiposClienteProvRepository.findAllAnticiposCienteByProyectoId(proyectoId);
    }

    async updateAnticipoCliente(id, updateData) {
        return anticiposClienteProvRepository.updateAnticipoCliente(id, updateData);
    }

    async deleteAnticipoCliente(id) {
        return anticiposClienteProvRepository.deleteAnticipoCliente(id);
    }

    async createAnticipoProveedor(data) {
        const id = idgenerate("anticipo-proveedor");
        return anticiposClienteProvRepository.createAnticipoProveedor({ ...data, id: id });
    }

    async getAnticiposProveedorByProyectoId(proyectoId) {
        return anticiposClienteProvRepository.findAllAnticiposProveedorByProyectoId(proyectoId);
    }

    async updateAnticipoProveedor(id, updateData) {
        return anticiposClienteProvRepository.updateAnticipoProveedor(id, updateData);
    }

    async deleteAnticipoProveedor(id) {
        return anticiposClienteProvRepository.deleteAnticipoProveedor(id);
    }

}
export default new anticipoClientesProvService();